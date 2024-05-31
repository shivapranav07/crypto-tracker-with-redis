import { Request, Response } from 'express';
import Alert from '../models/alert';
import { fetchCryptoPrices } from '../services/cryptoService';

export const createAlert = async (req: Request, res: Response) => {
  const { userId, crypto, targetPrice, direction } = req.body;
  const alert = new Alert({ userId, crypto, targetPrice, direction });
  await alert.save();
  res.status(201).send(alert);
};

export const checkAlerts = async () => {
  const alerts = await Alert.find({ notified: false });
  const cryptos = [...new Set(alerts.map(alert => alert.crypto))];
  const prices = await fetchCryptoPrices(cryptos, ['usd']);

  alerts.forEach(async (alert) => {
    const currentPrice = prices[alert.crypto].usd;
    if ((alert.direction === 'above' && currentPrice > alert.targetPrice) ||
        (alert.direction === 'below' && currentPrice < alert.targetPrice)) {
      alert.notified = true;
      await alert.save();
      // Send notification logic (e.g., email, SMS)
      console.log(`Alert for ${alert.crypto}: Current price is ${currentPrice}, target was ${alert.targetPrice}`);
    }
  });
};
