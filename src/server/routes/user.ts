import mongoose from 'mongoose';
import express from 'express';
import User from '../../models/user';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role, teacherID, parentID } = req.body;
    
    // Check if parentID is provided
    if (!parentID) {
      res.status(400).send('Parent ID is required');
      return;
    }
    
    // Check if parent exists
    const parent = await User.findById(parentID);
    if (!parent) {
      res.status(400).send('Parent not found');
      return;
    }
    
    const newUser = new User({ name, email, password, role, teacherID: new mongoose.Types.ObjectId(parseInt(teacherID)), parentID: new mongoose.Types.ObjectId(parseInt(parentID)) });
    await newUser.save();
    res.status(201).send('User created');
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;
