const express = require("express");
const { registerController, getAllUser, loginController } = require("../controller/userController");

// router object
const router = express.Router();

// get all user || GET
router.get('/all-user',getAllUser);

// register || POST 
router.post('/register',registerController);

// login || GET
router.post('/login',loginController);

module.exports = router;