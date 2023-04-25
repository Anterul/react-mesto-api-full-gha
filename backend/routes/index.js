const routes = require('express').Router();
const cors = require('cors');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateRegister, validateLogin } = require('../utils/validators');

routes.use('*', cors());

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateRegister, createUser);

routes.use(auth);

routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

module.exports = { routes };
