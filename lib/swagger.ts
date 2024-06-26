import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: 'app/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Escola swagger API',
                version: '1.0'
            },
            components: {
                securitySchemes: {
                    BearerAuth:{
                        type: 'http',
                        scheme: 'Bearer',
                        bearerFormat: 'JWT'
                    },
                },
            },
            security: []
        }
    });
    return spec;
}