const express = require("express");
const router = express.Router();
const { addUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");
const validateUser = require("../middlewares/validate.middleware");
const authAdmin = require("../middlewares/auth.middleware");

router.post("/", authAdmin, upload.single("photo"), validateUser, addUser);
router.get("/", authAdmin, getUsers);
router.get("/:id", authAdmin, getUser);
router.put("/:id", authAdmin, upload.single("photo"), validateUser, updateUser);
router.delete("/:id", authAdmin, deleteUser);

module.exports = router;
