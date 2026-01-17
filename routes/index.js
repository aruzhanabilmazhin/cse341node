import express from 'express';
import contactsRoutes from './contacts.js';

const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('Welcome to Contacts API');
});

// Mount contacts routes
router.use('/contacts', contactsRoutes);

export default router;
