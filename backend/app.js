import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cors from 'cors';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(cors());

// File system helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve uploaded images
app.use("/uploads", express.static(join(__dirname, "uploads")));

// API Routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

// ------------------- Deployment Setup ------------------- //
const frontendPath = join(__dirname, "../frontend/dist");

// Serve frontend build
app.use(express.static(frontendPath));


app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(join(frontendPath, "index.html"));
});
// --------------------------------------------------------- //

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
