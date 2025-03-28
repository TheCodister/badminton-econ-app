import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://badminton-econ-app.vercel.app',
      'https://badminton-econ-app-nkv4.vercel.app',
    ], // Allowed origins
    credentials: true,
  })

  await app.listen(3001)
}
bootstrap()
