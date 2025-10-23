const {
  generateAuthUrl,
  handleOAuthCallback,
} = require("../services/googleAuth.service");

const getAuthUrl = (req, res) => {
  const url = generateAuthUrl();
  res.json({ url });
};

const oauthCallback = async (req, res) => {
  try {
    const { code, adminId } = req.query;
    const admin = await handleOAuthCallback(adminId, code);
    res.json({ success: true, message: "Gmail connecté avec succès !", admin });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAuthUrl, oauthCallback };
