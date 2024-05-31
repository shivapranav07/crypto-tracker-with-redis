 // controllers/cryptoController.ts
import { Request, Response } from 'express';
import { fetchCryptoPrices } from '../services/cryptoService';

export const getCryptoPrices = async (req: Request, res: Response) => {
  const { cryptos, currencies } = req.query;

  if (!cryptos || !currencies) {
    return res.status(400).send('Missing required query parameters: cryptos, currencies');
  }

  const cryptoArray = (cryptos as string).split(',');
  const currencyArray = (currencies as string).split(',');

  try {
    const prices = await fetchCryptoPrices(cryptoArray, currencyArray);
    res.json(prices);
  } catch (error: any) {
    console.error('Error fetching crypto prices:', error.message);
    res.status(500).send('Error fetching crypto prices');
  }
};
