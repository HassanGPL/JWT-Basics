const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const authorizationMiddleware = require('../middleware/auth');

router.route('/dashboard').get(authorizationMiddleware, mainController.getDashboard);
router.route('/login').post(mainController.postLogin);

module.exports = router;