const express = require("express");
const router = express.Router();
const { register, validate, login } = require("../controllers/admin.controller");
const upload = require("../middlewares/multer.middleware");

router.post("/register", upload.single("photo"), register);
router.get("/validate", validate);
router.post("/login", login);

module.exports = router;
