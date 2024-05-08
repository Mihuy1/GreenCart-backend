import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
      {
        query: `
          {
            alerts(feeds: ["HSL"]) {
              alertDescriptionText
              alertDescriptionTextTranslations {
                text
                language
              }
              route {
                gtfsId
              }
              trip {
                gtfsId
              }
              stop {
                gtfsId
              }
              effectiveStartDate
              effectiveEndDate
            }
          }
        `,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
