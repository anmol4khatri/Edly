const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Expects .env in CWD (Edly Backend root)

const resetDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/edly";
        console.log(`Using URI: ${mongoUri.split('@')[1] || 'localhost'}`); // Log safely
        await mongoose.connect(mongoUri);

        // Drop the entire database
        await mongoose.connection.db.dropDatabase();
        console.log("SUCCESS: Database dropped completely.");

    } catch (err) {
        console.error("Error resetting DB:", err);
    } finally {
        await mongoose.connection.close();
        console.log("Connection closed.");
    }
};

resetDb();
