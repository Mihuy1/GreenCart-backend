import express from 'express';
import axios from 'axios';
import axios from 'axios';

const router = express.Router();

router.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.digitransit.fi/routing-data/v3/finland',
      {
        headers: {
          'Cache-Control': 'no-cache',
          'digitransit-subscription-key': '5f623da3094e44ef9e2b2a80d9f6bdfa',
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data.');
  }
});

export default router;
