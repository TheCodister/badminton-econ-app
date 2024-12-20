import { z } from 'zod'

export const ShoeShuttlecockSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number().nonnegative(), // Ensure price is non-negative
})

export const UserSchema = z.object({
  UserID: z.string().uuid(), // Validate as UUID
  Username: z.string(),
  mail: z.string().email(), // Validate as email
  Phonenumber: z.string().regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number'), // Example regex for phone validation
})

export const Brand = z.enum([
  'Lining',
  'Yonex',
  'Victor',
  'Mizuno',
  'VS',
  'Kumpoo',
  'Apacs',
  'Proace',
  'Fleet',
  'Flypower',
  'Reson',
])

export const RacketSchema = z.object({
  product_id: z.string(),
  product_name: z.string(),
  brand: Brand,
  image_url: z.string().url(), // Validate as a URL
  price: z.number().nonnegative(),
  description: z.string(),
  status: z.enum(['available', 'unavailable']),
  sales: z.boolean(),
  stock: z.number().nonnegative(),
  available_location: z.array(z.string()),
  line: z.string(),
  stiffness: z.string(),
  weight: z.string(),
  balance: z.string(),
  max_tension: z.string(),
  length: z.number().positive(),
  technology: z.array(z.string()),
})

export type Racket = z.infer<typeof RacketSchema>
export type User = z.infer<typeof UserSchema>
export type ShoeShuttlecock = z.infer<typeof ShoeShuttlecockSchema>
