
const axios = require('axios');
require('dotenv').config();
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({});

retriever = PineconeHybridSearchRetriever(
  embeddings=embeddings, sparse_encoder=bm25_encoder, index=index
)

async function fetchContext(question) {
  try {
    console.log(`Fetching context for question: ${question}`);
    const context = await langChain.getContext(question);
    console.log(`Context fetched: ${context}`);
    return context;
  } catch (error) {
    console.error('Error fetching context from LangChain:', error.message);
    console.error(error.stack);
    throw error;
  }
}

async function generateAnswer(question, context) {
  try {
    console.log(`Generating answer for question: ${question} with context`);
    const response = await axios.post(`${OPENAI_API_URL}/v1/engines/davinci/completions`, {
      prompt: `${context}\n\n${question}`,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    const answer = response.data.choices[0].text.trim();
    console.log(`Generated answer: ${answer}`);
    return answer;
  } catch (error) {
    console.error('Error generating answer with OpenAI:', error.message);
    console.error(error.stack);
    throw error;
  }
}

async function fetchRelevantInformation(question) {
  try {
    console.log(`Fetching relevant information for question: ${question}`);
    const context = await fetchContext(question);
    const answer = await generateAnswer(question, context);
    return answer;
  } catch (error) {
    console.error('Error in fetchRelevantInformation:', error.message);
    console.error(error.stack);
    throw error;
  }
}

module.exports = { fetchRelevantInformation };