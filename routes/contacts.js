import express from 'express';
import database from '../database.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = database.getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = database.getDb();
    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
