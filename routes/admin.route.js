const express = require("express");
const router = express.Router();
const {
  register,
  validate,
  login,
  me,
  count,
} = require("../controllers/admin.controller");
const upload = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/count", count);
router.post("/register", upload.single("photo"), register);
router.post("/validate", validate);
router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;
