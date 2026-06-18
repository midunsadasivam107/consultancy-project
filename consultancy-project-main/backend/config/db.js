const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    throw new Error('Missing MONGO_URI in environment');
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGO_DB || undefined,
  });

  const { host, name } = mongoose.connection;
  console.log(`MongoDB connected: ${host}/${name}`);
}

module.exports = { connectDB };
