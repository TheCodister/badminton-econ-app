export interface ShoeShuttlecockData {
  name: string
  brand: string
  price: number
}

export interface User {
  UserID: string
  Username: string
  mail: string
  Phonenumber: string
}

export enum Brand {
  LINING = 'Lining',
  YONEX = 'Yonex',
  VICTOR = 'Victor',
  MIZUNO = 'Mizuno',
  VS = 'VS',
  KUMPOO = 'Kumpoo',
  APACS = 'Apacs',
  PROACE = 'Proace',
  FLEET = 'Fleet',
  FLYPOWER = 'Flypower',
  RESON = 'Reson',
}

export interface Racket {
  product_id: string
  product_name: string
  brand: Brand
  image_url: string
  price: number
  description: string
  status: 'available' | 'unavailable'
  sales: boolean
  stock: number
  available_location: string[]
  line: string
  stiffness: string
  weight: string
  balance: string
  max_tension: string
  length: number
  technology: string[]
}
