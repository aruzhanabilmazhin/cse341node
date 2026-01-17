import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' }); // make sure .env is in project root

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
        url: process.env.SWAGGER_URL || 'https://cse341node-q0o5.onrender.com/'
      }
    ]
  },
  apis: ['./routes/*.js'] // Swagger will read comments from your routes folder
};

export const swaggerSpec = swaggerJsdoc(options);
