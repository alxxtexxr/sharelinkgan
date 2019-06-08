const express = require('express');

const router = express.Router();

// Import controller
const userController = require('../controllers/users');

// Import helper
const validateUser = require('../helpers/validate-user');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:username', validateUser, userController.profile);
// router.get('/:username/links', validateUser, userController.userLinks);

module.exports = router;