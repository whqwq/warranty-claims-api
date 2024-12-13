import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Warranty Claims API')
  .setDescription('The API for managing warranty claims.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
