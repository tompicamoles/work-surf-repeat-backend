import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../package.json';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Work Surf Repeat API',
      version,
      description: 'API documentation for Work Surf Repeat service',
    },
    components: {
      schemas: {
        Spot: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {
              type: 'integer',
              description: 'Spot identifier',
              example: 5,
            },
            name: {
              type: 'string',
              description: 'Spot name',
              example: 'Canggu, Bali',
            },
            country: {
              type: 'string',
              description: 'Country where the spot is located',
              example: 'Indonesia',
            },
            image_link: {
              type: 'string',
              description: 'URL to the spot image',
              example: 'https://example.com/images/canggu.jpg',
            },
            has_coworking: {
              type: 'boolean',
              description: 'Whether the spot has coworking facilities',
              example: true,
            },
            has_coliving: {
              type: 'boolean',
              description: 'Whether the spot has coliving facilities',
              example: true,
            },
            latitude: {
              type: 'string',
              description: 'Latitude coordinates of the spot',
              example: '-8.6478',
            },
            longitude: {
              type: 'string',
              description: 'Longitude coordinates of the spot',
              example: '115.1385',
            },
            submitted_by: {
              type: 'string',
              description: 'User who submitted the spot',
              example: 'user123',
            },
            wifi_quality: {
              type: 'number',
              description: 'Quality of WiFi at the spot (rating)',
              example: 4.2,
            },
            country_code: {
              type: 'string',
              description: 'Country code of the spot location',
              example: 'ID',
            },
            continent: {
              type: 'string',
              description: 'Continent where the spot is located',
              example: 'Asia',
            },
            surf_season: {
              type: 'string',
              description: 'Best season for surfing at this spot',
              example: 'May to September',
            },
            good_weather_season: {
              type: 'string',
              description: 'Season with the best weather at this spot',
              example: 'April to October',
            },
            timezone: {
              type: 'string',
              description: 'Timezone of the spot',
              example: 'Asia/Makassar',
            },
            life_cost: {
              type: 'number',
              description: 'Cost of living at the spot',
              example: 1200,
            },
            creator_name: {
              type: 'string',
              description: 'Name of the spot creator',
              example: 'Jane Smith',
            },
            like_user_ids: {
              type: 'array',
              items: {
                type: 'integer',
              },
              description: 'IDs of users who liked this spot',
              example: [42, 57, 63],
            },
            total_likes: {
              type: 'integer',
              description: 'Total number of likes for this spot',
              example: 3,
            },
          },
        },
        SpotLike: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Like identifier',
              example: 789,
            },
            user_id: {
              type: 'integer',
              description: 'User identifier who liked the spot',
              example: 42,
            },
            spot_id: {
              type: 'integer',
              description: 'Spot identifier that was liked',
              example: 5,
            },
          },
        },
        WorkPlace: {
          type: 'object',
          required: ['id', 'name', 'type', 'spot_id'],
          properties: {
            id: {
              type: 'string',
              description: 'WorkPlace identifier',
              example: 'wp123',
            },
            name: {
              type: 'string',
              description: 'WorkPlace name',
              example: 'Beachside Coworking',
            },
            type: {
              type: 'string',
              description: 'Type of workplace (e.g., cafe, coworking space)',
              example: 'coworking',
            },
            spot_id: {
              type: 'integer',
              description: 'ID of the spot where this workplace is located',
              example: 5,
            },
            submitted_by: {
              type: 'integer',
              description: 'ID of the user who submitted this workplace',
              example: 42,
            },
            creator_name: {
              type: 'string',
              description: 'Name of the creator of this workplace',
              example: 'John Doe',
            },
            adress: {
              type: 'string',
              description: 'Address of the workplace',
              example: '123 Beach Road, Bali',
            },
            image_link: {
              type: 'string',
              description: 'URL to the workplace image',
              example: 'https://example.com/images/beachside-coworking.jpg',
            },
            latitude: {
              type: 'number',
              description: 'Latitude coordinates of the workplace',
              example: -8.6478,
            },
            longitude: {
              type: 'number',
              description: 'Longitude coordinates of the workplace',
              example: 115.1385,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the workplace was created',
              example: '2023-05-15T08:30:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the workplace was last updated',
              example: '2023-06-20T14:45:00Z',
            },
            rating: {
              type: 'number',
              nullable: true,
              description: 'Average rating of the workplace',
              example: 4.5,
            },
          },
        },
        WorkPlaceRating: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Rating identifier',
              example: 123,
            },
            work_place_id: {
              type: 'string',
              description: 'ID of the workplace that was rated',
              example: 'wp123',
            },
            user_id: {
              type: 'integer',
              description: 'ID of the user who submitted the rating',
              example: 42,
            },
            rating: {
              type: 'number',
              description: 'Rating value (typically 1-5)',
              example: 4,
            },
          },
        },
        CreateSpotDto: {
          type: 'object',
          required: ['name', 'country', 'latitude', 'longitude', 'wifi_quality'],
          properties: {
            name: {
              type: 'string',
              description: 'Spot name',
              example: 'Canggu, Bali',
            },
            country: {
              type: 'string',
              description: 'Country where the spot is located',
              example: 'Indonesia',
            },
            image_link: {
              type: 'string',
              description: 'URL to the spot image',
              example: 'https://example.com/images/canggu.jpg',
            },
            has_coworking: {
              type: 'boolean',
              description: 'Whether the spot has coworking facilities',
              example: true,
            },
            has_coliving: {
              type: 'boolean',
              description: 'Whether the spot has coliving facilities',
              example: true,
            },
            latitude: {
              type: 'number',
              description: 'Latitude coordinates of the spot',
              example: -8.6478,
            },
            longitude: {
              type: 'number',
              description: 'Longitude coordinates of the spot',
              example: 115.1385,
            },
            wifi_quality: {
              type: 'number',
              description: 'Quality of WiFi at the spot (rating)',
              example: 4.2,
            },
          },
        },
        CreateWorkPlaceDto: {
          type: 'object',
          required: ['id', 'name', 'type', 'spot_id', 'adress', 'latitude', 'longitude'],
          properties: {
            id: {
              type: 'string',
              description: 'Workplace identifier',
              example: 'wp123',
            },
            name: {
              type: 'string',
              description: 'Workplace name',
              example: 'Beachside Coworking',
            },
            type: {
              type: 'string',
              description: 'Type of workplace (e.g., cafe, coworking space)',
              example: 'coworking',
            },
            spot_id: {
              type: 'integer',
              description: 'ID of the spot where this workplace is located',
              example: 5,
            },
            adress: {
              type: 'string',
              description: 'Address of the workplace',
              example: '123 Beach Road, Bali',
            },
            image_link: {
              type: 'string',
              format: 'uri',
              description: 'URL to the workplace image',
              example: 'https://example.com/images/beachside-coworking.jpg',
            },
            latitude: {
              type: 'number',
              description: 'Latitude coordinates of the workplace',
              example: -8.6478,
            },
            longitude: {
              type: 'number',
              description: 'Longitude coordinates of the workplace',
              example: 115.1385,
            },
            rating: {
              type: 'number',
              description: 'Rating of the workplace',
              example: 4.5,
            },
          },
        },
        CreateWorkPlaceRatingDto: {
          type: 'object',
          required: ['rating'],
          properties: {
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Rating value (1-5)',
              example: 4,
            },
          },
        },
      },
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'API Key for accessing the API',
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // Add global security requirement
    security: [{ apiKey: [] }],
    paths: {
      '/spots': {
        get: {
          tags: ['Spots'],
          summary: 'Get all spots',
          responses: {
            200: {
              description: 'List of spots',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Spot',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Spots'],
          summary: 'Create a new spot',
          security: [{ apiKey: [] }, { bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateSpotDto',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Spot created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Spot',
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
            },
            401: {
              description: 'Unauthorized',
            },
          },
        },
      },
      '/spots/{id}': {
        get: {
          tags: ['Spots'],
          summary: 'Get spot by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Spot ID',
            },
          ],
          responses: {
            200: {
              description: 'Spot details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Spot',
                  },
                },
              },
            },
            404: {
              description: 'Spot not found',
            },
          },
        },
        delete: {
          tags: ['Spots'],
          summary: 'Delete a spot',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Spot ID',
            },
          ],
          responses: {
            200: {
              description: 'Spot deleted successfully',
            },
            404: {
              description: 'Spot not found',
            },
          },
        },
      },
      '/spots/{id}/workplaces': {
        get: {
          tags: ['Spots', 'Workplaces'],
          summary: 'Get workplaces by spot ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Spot ID',
            },
          ],
          responses: {
            200: {
              description: 'List of workplaces for the spot',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/WorkPlace',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/spots/{id}/like': {
        post: {
          tags: ['Spots'],
          summary: 'Like a spot',
          security: [{ apiKey: [] }, { bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Spot ID',
            },
          ],
          responses: {
            200: {
              description: 'Spot liked successfully',
            },
            401: {
              description: 'Unauthorized',
            },
            404: {
              description: 'Spot not found',
            },
          },
        },
      },
      '/spots/{id}/likes': {
        get: {
          tags: ['Spots'],
          summary: 'Get likes for a spot',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Spot ID',
            },
          ],
          responses: {
            200: {
              description: 'List of likes for the spot',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/SpotLike',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/workplaces': {
        get: {
          tags: ['Workplaces'],
          summary: 'Get all workplaces',
          responses: {
            200: {
              description: 'List of workplaces',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/WorkPlace',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Workplaces'],
          summary: 'Create a new workplace',
          security: [{ apiKey: [] }, { bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateWorkPlaceDto',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Workplace created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/WorkPlace',
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
            },
            401: {
              description: 'Unauthorized',
            },
          },
        },
      },
      '/workplaces/{id}': {
        get: {
          tags: ['Workplaces'],
          summary: 'Get workplace by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Workplace ID',
            },
          ],
          responses: {
            200: {
              description: 'Workplace details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/WorkPlace',
                  },
                },
              },
            },
            404: {
              description: 'Workplace not found',
            },
          },
        },
        delete: {
          tags: ['Workplaces'],
          summary: 'Delete a workplace',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Workplace ID',
            },
          ],
          responses: {
            200: {
              description: 'Workplace deleted successfully',
            },
            404: {
              description: 'Workplace not found',
            },
          },
        },
      },
      '/workplaces/{id}/ratings': {
        get: {
          tags: ['Workplaces'],
          summary: 'Get ratings for a workplace',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Workplace ID',
            },
          ],
          responses: {
            200: {
              description: 'List of ratings for the workplace',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/WorkPlaceRating',
                    },
                  },
                },
              },
            },
            404: {
              description: 'Workplace not found',
            },
          },
        },
        post: {
          tags: ['Workplaces'],
          summary: 'Create a rating for a workplace',
          security: [{ apiKey: [] }, { bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Workplace ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateWorkPlaceRatingDto',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Rating created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/WorkPlaceRating',
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
            },
            401: {
              description: 'Unauthorized',
            },
            404: {
              description: 'Workplace not found',
            },
          },
        },
        put: {
          tags: ['Workplaces'],
          summary: 'Update a rating for a workplace',
          security: [{ apiKey: [] }, { bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Workplace ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateWorkPlaceRatingDto',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Rating updated successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/WorkPlaceRating',
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
            },
            401: {
              description: 'Unauthorized',
            },
            404: {
              description: 'Workplace or rating not found',
            },
          },
        },
        delete: {
          tags: ['Workplaces'],
          summary: 'Delete a rating for a workplace',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Workplace ID',
            },
          ],
          responses: {
            200: {
              description: 'Rating deleted successfully',
            },
            404: {
              description: 'Workplace or rating not found',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

export const specs = swaggerJSDoc(options);
