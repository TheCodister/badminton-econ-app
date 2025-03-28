import { z } from 'zod'

// Enum for Brands (matching Prisma Enum)
export const BrandEnum = z.enum([
  'LINING',
  'YONEX',
  'VICTOR',
  'MIZUNO',
  'VS',
  'KUMPOO',
  'APACS',
  'PROACE',
  'FLEET',
  'FLYPOWER',
  'RESON',
])

export const CartItem = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
})

// User Schema (matches backend structure)
export const UserSchema = z.object({
  id: z.string().uuid(), // Match UUID format in Prisma
  username: z.string(),
  email: z.string().email(),
  phone_number: z.string().regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number'), // Consistent naming
})

// Shoe & Shuttlecock Schema (unchanged)
export const ShoeShuttlecockSchema = z.object({
  name: z.string(),
  brand: BrandEnum,
  price: z.number().nonnegative(), // Ensure price is non-negative
})

// Racket Schema (matches backend structure)
export const RacketSchema = z.object({
  id: z.string().uuid(),
  line: z.string(),
  stiffness: z.string(),
  weight: z.string(),
  balance: z.string(),
  max_tension: z.string(),
  length: z.number().positive(),
  technology: z.array(z.string()),
  product: z.object({
    id: z.string().uuid(),
    image_url: z.string().url(),
    product_name: z.string(),
    brand: z.enum(['YONEX', 'LINING', 'VICTOR']), // Add all possible brands here
    price: z.string(), // Backend is returning price as string, not number
    description: z.string(),
    status: z.enum(['AVAILABLE', 'UNAVAILABLE', 'INACTIVE']), // Match backend enum if applicable
    sales: z.boolean(),
    stock: z.number().nonnegative(),
    available_location: z.array(z.string()),
  }),
})

// Types inferred from schema
export type User = z.infer<typeof UserSchema>
export type Racket = z.infer<typeof RacketSchema>
export type ShoeShuttlecock = z.infer<typeof ShoeShuttlecockSchema>
