import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from "./routes/notesRoutes.js";
import connectDB from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();
dotenv.config();
const PORT  = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes",notesRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server Started at http://localhost:${PORT}/api/notes`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to DB. Server not started:", error.message);
    process.exit(1);
  });
