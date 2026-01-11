import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongodb from './routes/data/database.js';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', routes);

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is running and Node running on port ${port}`);
    });
  }
});
