const { errors } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateRegister, validateLogin } = require('../utils/validators');
const { errorHandler } = require('../middlewares/errorHandler');
const NotFound = require('../utils/errors/NotFound');
const { requestLogger, errorLogger } = require('../middlewares/logger');

routes.use(requestLogger);

routes.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://fmesto.nomoredomains.monster, localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateRegister, createUser);

routes.use(auth);

routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

routes.use(errorLogger);

routes.all('*', (req, res, next) => { next(new NotFound('Несуществующий маршрут.')); });

routes.use(errors());

routes.use(errorHandler);

module.exports = { routes };
