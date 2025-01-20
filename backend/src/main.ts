import { NestFactory } from '@nestjs/core'
import * as cors from 'cors'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Use cors middleware
  app.use(
    cors({
      origin: ['http://localhost:3001'], // Allowed origins
      credentials: true,
    }),
  )

  await app.listen(3000)
}
bootstrap()
