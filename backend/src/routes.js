const express = require('express');
const jwt = require('express-jwt');
const { celebrate, Segments, Joi } = require('celebrate');

// Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
const { Secret } = require('./config/token');

routes.get('/ongs', OngController.index);
routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2),
    }),
  }),
  OngController.create,
);
routes.put(
  '/ongs/:id',
  jwt({ secret: Secret }),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  OngController.update,
);
routes.delete(
  '/ongs/:id',
  jwt({ secret: Secret }),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  OngController.delete,
);

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentController.index,
);
routes.post('/incidents', jwt({ secret: Secret }), IncidentController.create);
routes.delete(
  '/incidents/:id',
  jwt({ secret: Secret }),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete,
);

routes.get(
  '/profile',
  jwt({ secret: Secret }),
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index,
);

routes.post('/sessions', SessionController.create);

module.exports = routes;
