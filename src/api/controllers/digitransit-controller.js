/**
 * @api {post} /disruptions Fetch disruptions
 * @apiName FetchDisruptions
 * @apiGroup Disruption
 * @apiSuccess {Object[]} disruptions List of disruptions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Disruptions not found.
 */

import axios from 'axios';
import dotenv from 'dotenv/config';

const fetchDisruptions = async () => {
  try {
    const query = `
      {
        alerts {
          alertDescriptionText
          alertSeverityLevel
          alertUrl
          alertUrlTranslations {
            text
            language
          }
        }
      }
    `;

    const graphqlEndpoint =
      'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
    const headers = {
      'Content-Type': 'application/graphql',
      'digitransit-subscription-key': process.env.DIGITRANSIT_SUBSCRIPTION_KEY,
    };

    const response = await axios.post(graphqlEndpoint, query, {headers});
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch disruptions');
  }
};

export {fetchDisruptions};
