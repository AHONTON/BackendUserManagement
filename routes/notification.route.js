const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { getNotifications, markAsRead } = require("../controllers/notification.controller");


router.use(authMiddleware);
router.get("/", getNotifications);
router.patch("/:id/read", markAsRead);

module.exports = router;
