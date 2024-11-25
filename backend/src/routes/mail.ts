import nodemailer from 'nodemailer';
import crypto from 'crypto';
import express from 'express'
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './user.js';


const router = express.Router();
const prisma = new PrismaClient();

const sendBasicEmail =async (
 mail2:string ,
  mailSubject:string,
  mailBody:string
)=>{
  const EMAIL_ID = process.env.EMAIL_ID;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  
  const sender= nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:EMAIL_ID,
        pass:EMAIL_PASS
    }
})
  try{
       const response = await sender.sendMail(
       {
           from:EMAIL_ID,
           to:mail2,
           subject:mailSubject,
           text:mailBody
       });
   
       console.log(response);
  }catch(error){
    console.log(error)

       console.log(`something went wrong in the email services`);
  }
}


router.post('/invite', verifyToken, async (req, res) => {
  // try{
  //   const {email}= req.body
  //   sendBasicEmail(email,'this is subject','this is mailbody')

  // }catch(error){
  //   console.log(error)

  // }
 
  try {
    const inviterRole = (req as any).user.role;
    const { email } = req.body;

    // Only admin can invite users
    if (inviterRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Only admins can invite users' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Generate invitation token
    const inviteToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Store invitation in database
    const invitation = await prisma.invitation.create({
      data: {
        email,
        token: inviteToken,
        expiresAt
      }
    });

    // Create email transporter (configure with your SMTP settings)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Invitation link
    const inviteLink = `${process.env.FRONTEND_URL}/register?token=${inviteToken}`;

    // Send invitation email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Invitation to join our platform',
      html: `
        <h1>You've been invited!</h1>
        <p>Click the link below to create your account:</p>
        <a href="${inviteLink}">${inviteLink}</a>
        <p>This invitation expires in 24 hours.</p>
      `
    });

    res.status(200).json({ message: 'Invitation sent successfully' });
  } catch (error) {
    console.error('Invitation error:', error);
    res.status(500).json({ error: 'Failed to send invitation' });
  }
});

export default router

// Prisma schema addition (schema.prisma)

