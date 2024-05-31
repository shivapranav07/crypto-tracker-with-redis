import { Request, Response } from 'express';
import { fetchCryptoPrices } from '../services/cryptoService';
import Alert, { IAlert } from '../models/alert';

export const createAlert = async (req: Request, res: Response) => {
  try {
    const { userId, crypto, targetPrice, direction } = req.body;
    const alert = new Alert({ userId, crypto, targetPrice, direction });
    await alert.save();
    res.status(201).send(alert);
  } catch (error: any) {
    console.error('Error creating alert:', error.message);
    res.status(500).send('Error creating alert');
  }
};

export const checkAlerts = async () => {
  try {
    const alerts = await Alert.find({ notified: false }).exec(); // Use exec to get a Promise
    const cryptos = [...new Set(alerts.map(alert => alert.crypto))];
    const prices: Record<string, any> = await fetchCryptoPrices(cryptos, ['usd']);

    for (const alert of alerts) {
      const currentPrice = prices[alert.crypto]?.usd;
      if (currentPrice !== undefined) {
        if ((alert.direction === 'above' && currentPrice > alert.targetPrice) ||
            (alert.direction === 'below' && currentPrice < alert.targetPrice)) {
          alert.notified = true;
          await alert.save();
          // Send notification logic (e.g., email, SMS)
          console.log(`Alert for ${alert.crypto}: Current price is ${currentPrice}, target was ${alert.targetPrice}`);
        }
      } else {
        console.warn(`Price not available for ${alert.crypto}`);
      }
    }
  } catch (error: any) {
    console.error('Error checking alerts:', error.message);
  }
};
