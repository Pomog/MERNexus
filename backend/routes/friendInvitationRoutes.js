const express = require('express');
const router = express.Router();
const Joi = require('joi');
const auth = require('../middleware/auth');
const validator = require('express-joi-validation').createValidator({});
const friendInvitationControllers = require('../controllers/frindInvitation/friendInvitationControllers');

const postFriendInvitationSchema = Joi.object({
    targetMailAddress: Joi.string().email(),
});

router.post(
    '/invite',
    /** @type {import('express').RequestHandler} */ (auth),
    /** @type {import('express').RequestHandler} */ validator.body(postFriendInvitationSchema),
    friendInvitationControllers.controllers.postInvite);

module.exports = router;