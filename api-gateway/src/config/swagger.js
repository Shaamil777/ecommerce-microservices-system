const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Microservices API",
      version: "1.0.0",
      description: "A microservices-based ecommerce backend API with JWT authentication, role-based authorization, and full CRUD operations.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "API Gateway",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;