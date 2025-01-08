import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { admin, adminRouter } from './admin_panel/admin-config.js';
import { connect } from './config/database.js';
import userRoutes from './routes/otpRoute.js';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  methods: ['GET', 'POST', 'PUT'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

app.use(express.json());

// Calling Database function
connect();

// Route importing and mounting
// Use AdminJS Router
app.use(admin.options.rootPath, adminRouter);

// Mount routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
  console.log('Server Started');
});
