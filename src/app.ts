import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import alertRoutes from './routes/alertRoutes';
import priceRoutes from './routes/priceRoutes';
import { checkAlerts } from './controllers/alertcontroller';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', alertRoutes);
app.use('/api', priceRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      
      // Periodic alert checking
      setInterval(checkAlerts, 60000); // Every minute
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
