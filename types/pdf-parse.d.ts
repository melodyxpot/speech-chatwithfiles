declare module 'pdf-parse/lib/pdf-parse' {
  export interface PDFParseOptions {
    version?: string;
    max?: number;
    noparse?: boolean;
    pagerender?: (pageData: any) => Promise<string>;
  }

  export interface PDFParseResult {
    numpages: number;
    info: any;
    metadata: any;
    text: string;
    [key: string]: any;
  }

  export default function parseBuffer(
    buffer: Buffer | ArrayBuffer | Uint8Array,
    options?: PDFParseOptions,
  ): Promise<PDFParseResult>;
}
