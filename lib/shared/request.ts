import { API_URLS } from '../constants';

const fetchRequest = async (query: string) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const requestBody = JSON.stringify({
      query,
    });

    const options = {
      method: 'POST',
      url: API_URLS.GQL,
      headers,
      body: requestBody,
    };
    const response = await fetch(options.url, options);
    const json = await response.json();
    return json?.data;
  } catch (err) {
    console.log('ERROR DURING WEB REQUEST', err);
  }
};

export default fetchRequest;
