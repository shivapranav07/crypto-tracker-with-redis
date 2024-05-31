import axios from 'axios';
import redisClient from '../utils/redisClient';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const fetchCryptoPrices = async (cryptos: string[], currencies: string[]): Promise<any> => {
  const cacheKey = `cryptoPrices:${cryptos.join(',')}:${currencies.join(',')}`;
  const cachedPrices = await redisClient.get(cacheKey);
  
  if (cachedPrices) {
    return JSON.parse(cachedPrices);
  }
  
  const response = await axios.get(COINGECKO_API_URL, {
    params: {
      ids: cryptos.join(','),
      vs_currencies: currencies.join(','),
      x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
    },
  });

  await redisClient.set(cacheKey, JSON.stringify(response.data), {
    EX: 60, // Cache for 1 minute
  });
  return response.data;
};
