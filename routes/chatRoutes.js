const express = require('express');
const router = express.Router();
require('dotenv').config(); // Ensure dotenv is required to use environment variables
const langChainService = require('../services/langChainService'); // Import the LangChain service

router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      console.log("Received an empty question.");
      return res.status(400).json({ error: 'Question is required.' });
    }
    console.log(`Received question: ${question}`);
    const answer = await langChainService.fetchRelevantInformation(question);
    console.log(`Generated answer: ${answer}`);
    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error handling /ask endpoint:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;