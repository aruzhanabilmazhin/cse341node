import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './data/database.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: List of contacts
 */
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */
router.get('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const db = getDb();
    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post('/', async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    if (Object.values(contact).some(value => !value)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = getDb();
    const result = await db.collection('contacts').insertOne(contact);

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       204:
 *         description: Contact updated
 */
router.put('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = getDb();
    const result = await db.collection('contacts').replaceOne(
      { _id: new ObjectId(req.params.id) },
      updatedContact
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const db = getDb();
    const result = await db.collection('contacts').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
