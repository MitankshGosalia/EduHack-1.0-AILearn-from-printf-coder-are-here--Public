// services/gptService.js
import axios from 'axios';

const GPT_API_KEY = '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';

const generateFeedback = async (studentInput) => {
  const url = 'https://api.openai.com/v1/completions';
  
  const headers = {
    'Authorization': `Bearer ${GPT_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const data = {
    model: 'text-davinci-004',
    prompt: `Provide personalized feedback for the student input: ${studentInput}`,
    max_tokens: 150
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching AI feedback:', error);
    return "Unable to generate feedback at this time.";
  }
};

export { generateFeedback };
