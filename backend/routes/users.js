const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { validateProfile, validateAvatar } = require('../middleware/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUserId);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
