import express from 'express';
import contactsRouter from './contacts.js'; // make sure this file exists

const router = express.Router();

// Mount contacts routes at /contacts
router.use('/contacts', contactsRouter);

// Optional: home route
router.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

export default router;
