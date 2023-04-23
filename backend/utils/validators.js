const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('./regEx');

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.empty': 'поле "email" должно быть заполнено',
        'any.only': 'поле "email" должно быть валидным адресом электронной почты',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'поле "password" должно быть заполнено',
      }),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля "name" - 2',
        'string.max': 'максимальная длина поля "name" - 30',
        'string.empty': 'поле "name" должно быть заполнено',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля "about" - 2',
        'string.max': 'максимальная длина поля "about" - 30',
        'string.empty': 'поле "about" должно быть заполнено',
      }),
    avatar: Joi.string().regex(REGEX_URL)
      .messages({
        'string.empty': 'поле "avatar" должно быть заполнено',
        'any.only': 'поле "avatar" должно быть валидным url-адресом',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.empty': 'поле "email" должно быть заполнено',
        'any.only': 'поле "email" должно быть валидным адресом электронной почты',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'поле "password" должно быть заполнено',
      }),
  }),
});

module.exports.validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'минимальная длина поля "name" - 2',
        'string.max': 'максимальная длина поля "name" - 30',
        'string.empty': 'поле "name" должно быть заполнено',
      }),
    about: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'минимальная длина поля "about" - 2',
        'string.max': 'максимальная длина поля "about" - 30',
        'string.empty': 'поле "about" должно быть заполнено',
      }),
  }),
});

module.exports.validateAvarar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(REGEX_URL).required()
      .messages({
        'string.empty': 'поле "avatar" должно быть заполнено',
        'any.only': 'поле "avatar" должно быть валидным url-адресом',
      }),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required()
      .messages({
        'string.empty': 'поле "id" должно быть заполнено',
        'any.only': 'поле "id" должно состоять из 24 символов',
      }),
  }),
});

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'минимальная длина поля "name" - 2',
        'string.max': 'максимальная длина поля "name" - 30',
        'string.empty': 'поле "name" должно быть заполнено',
      }),
    link: Joi.string().regex(REGEX_URL).required()
      .messages({
        'string.empty': 'поле "link" должно быть заполнено',
        'any.only': 'поле "link" должно быть валидным url-адресом',
      }),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
      .messages({
        'string.empty': 'поле "id" должно быть заполнено',
        'any.only': 'поле "id" должно состоять из 24 символов',
      }),
  }),
});
