import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '#utils/logger.js';

dotenv.config(); // Expects .env in CWD (Edly Backend root)

const resetDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/edly';
    logger.info(`Using URI: ${mongoUri.split('@')[1] || 'localhost'}`); // Log safely
    await mongoose.connect(mongoUri);

    // Drop the entire database
    await mongoose.connection.db.dropDatabase();
    logger.info('SUCCESS: Database dropped completely.');
  } catch (err) {
    logger.error(err, 'Error resetting DB');
  } finally {
    await mongoose.connection.close();
    logger.info('Connection closed.');
  }
};

resetDb();
