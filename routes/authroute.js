const express = require('express');
const { registercontroller, logincontroller, testcontroller } = require('../controllers/authcontroller.js');
const { requiresignin, isadmin } = require('../middlewares/authmiddleware.js');


const router = express.Router()

router.post('/register', registercontroller)


router.post('/login', logincontroller)

router.get('/test', requiresignin, isadmin, testcontroller)

module.exports = router;