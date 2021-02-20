const express = require('express');
const router = express.Router();

//Controllers
const userControllers = require('../controllers/userControllers');
const auth = require('../lib/auth');

router.get('/');
router.post('/users/signup', userControllers.signUp);
router.post('/users/signin', userControllers.signIn);
router.get('/login', auth, userControllers.getUser);

module.exports = router;