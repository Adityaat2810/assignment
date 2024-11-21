
import {z} from 'zod'

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(["ADMIN", "MODERATOR","GUEST"])});
  
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
  