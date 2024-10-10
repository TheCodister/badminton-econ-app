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
  ProductID: string
  ProductName: string
  Brand: Brand
  ImageUrl: string
  Price: number
  Description: string
  Status: 'available' | 'unavailable'
  Sales: boolean
  Stock: number
  AvailableLocation: string[]
  Line: string
  Stiffness: string
  Weight: string
  Balance: string
  MaxTension: string
  Length: number
  Technology: string[]
}
