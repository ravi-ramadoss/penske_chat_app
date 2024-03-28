# Penske Chat App

This application is a demonstration of a chatbot designed to assist customers in returning their trucks. It was inspired by the projects being executed at Penske and is intended to showcase the developer's skills to Penske recruiters and hiring managers.

Test out the app live here (penske chat app)[https://penske-chat-app-b53dd4f99ae3.herokuapp.com]

## Features

- Provides information about the truck return process
- Uses a chatbot to interact with customers

## Implementation

The chatbot uses data from [Penske's Information Anywhere, Anytime](https://www.gopenske.com/information-anywhere-anytime) page. This data is fed into a Pinecone vector store, which is used to search for the vector most similar to the user's question. The most similar vector is then used to find the answer to the user's question. The document from Pinecone is then used to call OpenAI to generate an appropriate answer. Only publicly available data from Penske has been used.

## Code

The code for the entire project can be found in the following repositories:

1. [Penske Chat App](https://github.com/ravi-ramadoss/penske_chat_app)
2. [Penske Langchain Backend](https://github.com/ravi-ramadoss/penske-langchain-backend)

## Usage

To use the chatbot, simply ask it a question about the truck return process. The bot will then provide the necessary information based on the data it has been trained on.

## Future Work

This is a demo app and is still under development. Future updates will aim to improve the chatbot's accuracy and expand its knowledge base.

## Contact

For any queries or feedback, please reach out to the developer at [GitHub](https://github.com/ravi-ramadoss).