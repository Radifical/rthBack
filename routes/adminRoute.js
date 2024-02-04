import express from 'express';
import { Admin } from '../models/adminModel.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Route to Save a new admin
router.post('/', async (request, response) => {
  try {
    if (!request.body.username || !request.body.password) {
      return response.status(400).send({
        message: 'Send all required fields: username, password',
      });
    }
    const newAdmin = {
      username: request.body.username,
      password: request.body.password,
    };

    const admin = await Admin.create(newAdmin);

    return response.status(201).send(newAdmin);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all admins
router.get('/', async (request, response) => {
  try {
    const admins = await Admin.find({});

    return response.status(200).json({
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get a single admin by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const admin = await Admin.findById(id);

    return response.status(200).json(admin);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update an admin
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Admin.findByIdAndUpdate(id, request.body, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'Admin not found' });
    }

    return response.status(200).send({ message: 'Admin updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete an admin
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Admin.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Admin not found' });
    }

    return response.status(200).send({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Admin login route
router.post('/login', async (request, response) => {
    try {
      const { username, password } = request.body;
  
      // Find admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return response.status(401).send({ message: 'Login failed' });
      }
  
      // Check password (use bcrypt in production to hash passwords)
      const isMatch = password === admin.password; // Use bcrypt.compare in production
  
      if (!isMatch) {
        return response.status(401).send({ message: 'Login failed' });
      }
  
      // Login successful
      response.status(200).send({ message: 'Login successful', admin });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router;
