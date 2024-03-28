const axios = require('axios');
require('dotenv').config();

// const { LangChain } = require('langchain');

// const LANGCHAIN_API_KEY = process.env.LANGCHAIN_API_KEY;
// const OPENAI_API_URL = 'https://api.openai.com';
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// const langChain = new LangChain({ apiKey: LANGCHAIN_API_KEY });

async function fetchContext(question) {
  try {
    console.log(`Fetching context for question: ${question}`);
    const context = 'This is a context';
    // const context = await langChain.getContext(question);
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
    if ( process.env.NODE_ENV === 'development' ) {
      url = "http://127.0.0.1:5000/query";
    } else {
      url = "https://penske-langchain-backend-509e71cd8694.herokuapp.com/query?param=fromui";
    }
    console.log(`Generating answer for question: ${question} with context`);
    const response = await axios.get(url, {
       params: { question: question }
    })
    console.log(`Response: ${JSON.stringify(response.data)}`);
    // const response = await axios.post(`${OPENAI_API_URL}/v1/engines/davinci/completions`, {
    //   prompt: `${context}\n\n${question}`,
    //   max_tokens: 150,
    //   n: 1,
    //   stop: null,
    //   temperature: 0.5,
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${OPENAI_API_KEY}`
    //   }
    // });

    // const answer = response.data.choices[0].text.trim();
    // const answer = 'This is an answer';
    console.log(`Generated answer generateAnswer: ${JSON.stringify(response.data)}`);
    return JSON.stringify(response.data);
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
    console.log(`Fetched answer: ${answer}`);
    return answer;
  } catch (error) {
    console.error('Error in fetchRelevantInformation:', error.message);
    console.error(error.stack);
    throw error;
  }
}

module.exports = { fetchRelevantInformation };