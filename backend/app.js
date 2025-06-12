import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { admin, adminRouter } from './admin_panel/admin-config.js';
import { connect } from './config/database.js';
import userRoutes from './routes/otpRoute.js';
import authRoutes from './routes/authRoute.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS configuration object for security and cross-origin requests
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend origin (update as needed)
  methods: ['GET', 'POST', 'PUT'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
};

// Apply CORS middleware to the Express app
app.use(cors(corsOptions));

// Set server port from environment or default to 4000
const PORT = process.env.PORT || 4000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to the MongoDB database
connect();

// AdminJS admin panel route setup
app.use(admin.options.rootPath, adminRouter);

// Mount authentication and OTP-related routes under /api/v1 prefix
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);

// Start the server and listen for requests on specified PORT
app.listen(PORT, () => {
  console.log('Server Started');
});
