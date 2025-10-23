const express = require("express");
const router = express.Router();
const { getAuthUrl, oauthCallback } = require("../controllers/gmail.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get("/auth-url", getAuthUrl); 
router.get("/callback", oauthCallback); 

module.exports = router;
