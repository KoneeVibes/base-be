const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BASE',
            description: "Endpoints for web content management application",
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:8085",
            },
            {
                url: "https://demo-mfi.onrender.com",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ BearerAuth: [] }], // Applies authentication globally
    },
    apis: [path.join(__dirname, "route/**/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
