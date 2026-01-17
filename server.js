import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import { initDb } from './routes/data/database.js';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const app = express();
const port = process.env.PORT || 3000;

// JSON middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Swagger middleware — должно быть ДО маршрутов
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Проверка переменной окружения
console.log('MONGODB_URI =', process.env.MONGODB_URI);

// Инициализация базы данных
initDb((err) => {
  if (err) {
    console.error('Error connecting to DB:', err);
    process.exit(1);
  } else {
    console.log('Database connected successfully');

    // Маршруты
    app.use('/', routes);

    // Health check
    app.get('/health', (req, res) => res.send('Server is running'));

    // Запуск сервера
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
