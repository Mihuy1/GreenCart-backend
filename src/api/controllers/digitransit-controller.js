import axios from 'axios';

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
      'digitransit-subscription-key': process.env.DIGITRANSIT_API_KEY,
    };

    const response = await axios.post(graphqlEndpoint, query, {headers});
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch disruptions');
  }
};

export {fetchDisruptions};
