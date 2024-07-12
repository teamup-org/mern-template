import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send('User created');
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;
