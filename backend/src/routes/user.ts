import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { loginSchema, registerSchema } from '../types/schema.js';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

dotenv.config();

const JWT_SECRET =process.env.JWT_SECRET;

// Middleware to verify JWT token
const verifyToken = (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(`token is `,token)

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Register route
router.post('/register', async (req, res) => {
  try {
    const { 
        email, password, firstName, 
        lastName ,role
    } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
        where: { email } 
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role
      },
    });

    const token = jwt.sign(
        { userId: user.id,role:user.role }, 
        JWT_SECRET!!, 
        { expiresIn: '5d' }
    );

    res.status(201).json({ 
        user: { id: user.id, email: user.email }, 
        token 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    console.log(email,password)

    const user = await prisma.user.findUnique({ 
        where: { email } 
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id ,role:user.role}, JWT_SECRET!!, { expiresIn: '5d' });
    console.log(`token is`,token)

    res.status(201).json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/all', verifyToken, async (req, res) => {
  console.log('i am called')
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route to get user info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/edit/:id', verifyToken, async (req, res) => {
  try {
    //user id friom token 
    const userId = (req as any).user.userId; 
    const userRole = (req as any).user.role; 
    const { id } = req.params; 

    console.log('user role is ',userRole)
    

    // Check if the user is admin or the same user
    if (userId == id || userRole ==='ADMIN') {
      const { firstName, lastName, email, role } = req.body;
      console.log('')
  
      // Update user details
      const updatedUser = await prisma.user.update({
        where: { id:parseInt(id) },
        data: {
          firstName,
          lastName,
          email,
          role: userRole === 'admin' ? role : undefined, 
        },
        select: { id: true, firstName: true, lastName: true, email: true, role: true },
      });
  
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    }else{
      return res.status(403).json({ error: 'Unauthorized to edit this user' });

    }


  } catch (error) {
    if (error) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const userRole = (req as any).user.role;
    const { id } = req.params;

    // Only admin can delete users and users can't delete themselves
    if (userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Only admins can delete users' });
    }

    // Prevent deleting the last admin user
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });

    const userToDelete = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { role: true }
    });

    if (adminCount <= 1 && userToDelete?.role === 'ADMIN') {
      return res.status(400).json({ error: 'Cannot delete the last admin user' });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;