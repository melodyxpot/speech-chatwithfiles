import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { IncomingForm } from 'formidable';
import { CHAT_FILES_SERVER_HOST, OPENAI_API_HOST } from '@/utils/app/const';
import { LlamaIndex } from '@/types';
import PDFParser from 'pdf-parse';
import { v4 as uuidv4, v4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PDFLoader } from 'langchain/document_loaders';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { CustomPDFLoader } from '@/utils/customPDFLoader';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT as string,
    apiKey: process.env.PINECONE_API_KEY as string,
  });

  const form = new IncomingForm({
    multiples: false,
    uploadDir: 'pdf',
    filename: (name: string, ext: string) => {
      return v4() + '.pdf';
    },
  });

  try {
    // Form.parse will automatically save the file to the temporary directory.
    const fData = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      },
    );

    if (fData?.files.file) {
      const uploadedFile = fData.files.file;

      const directoryLoader = new DirectoryLoader(uploadedFile.filepath, {
        '.pdf': (path) => new CustomPDFLoader(path),
      });

      // const loader = new PDFLoader(filePath);
      const rawDocs = await directoryLoader.load();

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const docs = await textSplitter.splitDocuments(rawDocs);

      console.log('creating vector store...');
      // Create and store the embeddings in the vectorStore
      const embeddings = new OpenAIEmbeddings();
      const index = pinecone.Index(process.env.PINECONE_INDEX ?? '');
      const dbConfig = {
        pineconeIndex: index,
        namespace: process.env.PINECONE_NAMESPACE ?? '',
        textKey: 'text',
      };

      await PineconeStore.fromDocuments(docs, embeddings, dbConfig);

      // Delete the temporary file after processing
      fs.unlink(uploadedFile.filepath, (err) => {
        if (err) console.error('Error deleting temporary file:', err);
      });
    } else {
      res.status(400).send('No file was found in the request.');
    }
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).send('An error occurred while processing the file upload.');
  }
};

export default handler;
