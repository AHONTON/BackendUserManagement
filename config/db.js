const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Construire l'URI MongoDB Atlas à partir du .env
    const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

    // Connexion à MongoDB avec Mongoose
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
