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
    friendInvitationControllers.controllers.postInvite
);

const inviteDecisionSchema = Joi.object({
    id: Joi.string().required(),
})

router.post(
    '/accept',
    /** @type {import('express').RequestHandler} */ (auth),
    /** @type {import('express').RequestHandler} */ validator.body(inviteDecisionSchema),
    friendInvitationControllers.controllers.postAccept
);

router.post(
    '/reject',
    /** @type {import('express').RequestHandler} */ (auth),
    /** @type {import('express').RequestHandler} */ validator.body(inviteDecisionSchema),
    friendInvitationControllers.controllers.postReject
);

module.exports = router;