const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth/authController')

router.post('/register', authControllers.controllers.postRegister);

router.post('/login', authControllers.controllers.posLogin);

module.exports = router;