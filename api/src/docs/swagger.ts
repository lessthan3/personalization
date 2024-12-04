import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi, { type SwaggerOptions } from "swagger-ui-express";

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Maestro API",
      version: "1.0.0",
      description: "Maestro Personalization API"
    },
    servers: [
      {
        url: "/api/v1",
        description: "Maestro Personalization API"
      }
    ],
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["src/routers/*.ts", "src/docs/*.ts", "dist/routers/*.js", "dist/docs/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
