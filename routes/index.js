import express from 'express';
import { getDb } from './data/database.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('Welcome to Contacts API');
});

// GET all users
router.get('/contacts', async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET one user by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST create a new user
router.post('/contacts', async (req, res) => {
  try {
    const db = getDb();
    const { name, phone, email } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

    const result = await db.collection('users').insertOne({ name, phone, email });
    res.status(201).json({ message: 'User created', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT update a user by ID
router.put('/contacts/:id', async (req, res) => {
  try {
    const db = getDb();
    const { name, phone, email } = req.body;
    const updateResult = await db.collection('users').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, phone, email } }
    );

    if (updateResult.matchedCount === 0)
      return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE a user by ID
router.delete('/contacts/:id', async (req, res) => {
  try {
    const db = getDb();
    const deleteResult = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });

    if (deleteResult.deletedCount === 0)
      return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
