import { Request, Response } from 'express';
import { fetchCryptoPrices } from '../services/cryptoService';

export const getCryptoPrices = async (req: Request, res: Response) => {
  const { cryptos, currencies } = req.query;
  if (!cryptos || !currencies) {
    return res.status(400).send({ error: 'Please provide cryptos and currencies' });
  }

  const cryptoList = (cryptos as string).split(',');
  const currencyList = (currencies as string).split(',');

  try {
    const prices = await fetchCryptoPrices(cryptoList, currencyList);
    res.status(200).send(prices);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch prices' });
  }
};
