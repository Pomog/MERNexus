const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth/authController')

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const auth = require('../middleware/auth');

const registerSchema = Joi.object({
    userName: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().email().required(),
});

router.post(
    '/register',
    validator.body(registerSchema),
    authControllers.controllers.postRegister);

router.post(
    '/login',
    validator.body(loginSchema),
    authControllers.controllers.posLogin);

// test jsonToken middleware
router.get(
    '/test',
    auth,
    (req, res) =>
    {
        res.send("PASSED");
    });

module.exports = router;