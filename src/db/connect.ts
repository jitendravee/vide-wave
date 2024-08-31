import mongoose from 'mongoose';

export default async function ConnectDb() {
  const mongodbUrl = process.env.MONGODB_URL;

  if (!mongodbUrl) {
    throw ('MONGODB_URL environment variable is not defined');
  }

  try {
    await mongoose.connect(mongodbUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error after logging it
  }
}
