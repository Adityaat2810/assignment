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
        { userId: user.id }, 
        JWT_SECRET!!, 
        { expiresIn: '1h' }
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

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!!, { expiresIn: '1h' });

    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
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

export default router;