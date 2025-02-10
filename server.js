const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const app = express();

const port = 3000;
const highscore_api = 'https://rws7lufvk2.execute-api.us-east-1.amazonaws.com/Prod/highscore';
const apiKey = "CSjVYcUQHu3KKYe76UhQF9HJfFxJHE0YzomzXwme";

app.use(
  cors({
    origin: ['http://127.0.0.1:5500', 'https://wpmgame.com'], // Replace with your frontend origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  })
);

app.get('/apikey', async (req, res) => {
  try {
    // Check if API key is present and not undefined

    if (!apiKey || apiKey === 'undefined') {
      throw new Error('Missing or invalid API key');
    }

    // Fetch data from the external API first
    const response = await axios.get(highscore_api, {
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;

    // Send the response only after data is fetched successfully
    res.json(data);
    console.log(data); // Log the data for debugging purposes (optional)
  } catch (error) {
    console.error('Error Fetching data:', error);
    // Handle different error types more specifically
    if (error.response && error.response.status === 403) {
      res.status(403).send('Forbidden: Check API key or permissions');
    } else {
      res.status(500).send('Error fetching data');
    }
  }
});

app.listen(port, () => console.log(`you are now running the server on port ${port}`));