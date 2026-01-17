import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

console.log('Swagger server URL =', process.env.SWAGGER_URL);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Contacts API for W02 Project'
    },
    servers: [
      {
        url: process.env.SWAGGER_URL || 'https://cse341node-q0o5.onrender.com'
      }
    ]
  },
  apis: ['./routes/*.js', './routes/**/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);
