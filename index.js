const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Use an environment variable for your Hugging Face API key
const HF_API_KEY = process.env.HF_API_KEY;

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: 'No message' });
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      { inputs: userMessage },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );
    const reply = response.data?.[0]?.generated_text || response.data?.generated_text || 'Sorry, no reply.';
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ reply: 'AI Error: ' + e.message });
  }
});

app.get('/', (req, res) => res.send('1NONLYRICK AI Backend Running!'));

const port = process.env.PORT || 10000;
app.listen(port, () => console.log('Server running on port ' + port));
