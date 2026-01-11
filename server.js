import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import { initDb } from './routes/data/database.js'; // ✅ именованный импорт
import routes from './routes/index.js'; // main routes file

const app = express();
const port = process.env.PORT || 3000;

// JSON middleware
app.use(express.json());

// Проверка переменной окружения
console.log('MONGODB_URI =', process.env.MONGODB_URI);

// Инициализация базы данных
initDb((err) => {
  if (err) {
    console.error('Error connecting to DB:', err);
    process.exit(1);
  } else {
    console.log('Database connected successfully');

    // Подключаем маршруты после инициализации БД
    app.use('/', routes);

    // Health check
    app.get('/health', (req, res) => res.send('Server is running'));

    // Запуск сервера
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
