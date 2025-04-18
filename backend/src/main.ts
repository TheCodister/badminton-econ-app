import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for the badminton e-commerce platform')
    .setVersion('1.0')
    .addBearerAuth() // optional: for JWT
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

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
