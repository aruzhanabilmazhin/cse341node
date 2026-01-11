import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' }); // путь к твоему .env

let db; // сюда сохраняем подключение к базе

// Инициализация базы данных
export const initDb = async (callback) => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(); // по умолчанию берём базу из URI
    console.log('✅ Connected to MongoDB');
    callback();
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
    callback(err);
  }
};

// Получение экземпляра базы данных
export const getDb = () => {
  if (!db) throw new Error('Database not initialized');
  return db;
};
