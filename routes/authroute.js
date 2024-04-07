const express = require('express');
const { registercontroller, logincontroller } = require('../controllers/authcontroller.js');
const requiresignin = require('../middlewares/authmiddleware.js');
const isadmin = require('../middlewares/authmiddleware.js')

const router = express.Router()

router.post('/register', registercontroller)


router.post('/login', logincontroller)

router.get('/test', requiresignin, isadmin, testcontroller)

module.exports = router;