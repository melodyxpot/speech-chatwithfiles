[![My Skills](https://skillicons.dev/icons?i=nextjs,tailwind,react)](https://skillicons.dev)
# PDF + Speech ChatBot

![Chatfiles](./doc/chatfiles.png)

**Upload your file and have a conversation with it.**


## How to use it

Open https://speechchatbotwithfiles.impactbuidler.app and chat with [Good Example](./doc/Example.md)

### How to run locally without limited
1. clone this repository.
2. create a .env file on root path.
3. put your variables to .env file with the variables in env.example

run this project with docker compose.
```shell
yarn run dev
```

open browser with http://localhost:3000

### chat with file
1. upload a file.
2. have a conversation with it.
3. You can say something to chatbot and bot will catch and answer with the Microsoft woman's voice.

### chat with Normal GPT
1. send message without upload file.

### how to deploy flyio
- [Deploy to fly.io](./doc/deploy-flyio.md)


## Feature

- [x] Chat with GPT-3.5
- [x] Chat with file by Langchain + Pinecone
<!-- - [x] Upload multiple files to one index, chat with multiple files. -->
