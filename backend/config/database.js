import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected Successfully✅'))
    .catch((error) => {
      console.error('This error occurred:', error);
      process.exit(1);
    });
};
