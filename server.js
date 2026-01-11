import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Load environment variables

import express from 'express';
import database from './routes/data/database.js'; // your database.js
import routes from './routes/index.js'; // main routes file

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Test that MONGODB_URI is loaded
console.log('MONGODB_URI =', process.env.MONGODB_URI);

// Initialize DB first
database.initDb((err) => {
  if (err) {
    console.error('Error connecting to DB:', err);
    process.exit(1); // stop server if DB connection fails
  } else {
    console.log('Database connected successfully');

    // Mount routes AFTER DB is ready
    app.use('/', routes);

    // Optional: basic test route
    app.get('/health', (req, res) => res.send('Server is running'));

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
