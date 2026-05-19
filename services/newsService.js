const axios = require('axios');
require('dotenv').config();

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4/search';

async function fetchUAMNews() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: 'UAM OR "Urban Air Mobility" OR "도심 항공 모빌리티"',
        lang: 'ko',
        country: 'kr',
        max: 10,
        apikey: GNEWS_API_KEY,
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    throw error;
  }
}

module.exports = { fetchUAMNews };
