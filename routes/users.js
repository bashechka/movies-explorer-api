const router = require('express').Router();
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const {
  userGetValidator, userUpdateValidator,
} = require('../validators/validators');

router.get('/me', getCurrentUser);
router.patch('/me', userUpdateValidator, updateUser);

module.exports = router;
