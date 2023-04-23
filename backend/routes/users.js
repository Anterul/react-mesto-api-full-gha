const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validateProfile,
  validateAvarar,
  validateUserId,
} = require('../utils/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserId);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateAvarar, updateAvatar);

module.exports = router;
