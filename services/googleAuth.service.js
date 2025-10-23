const { google } = require("googleapis");
const Admin = require("../models/admin.model");

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Générer l’URL de connexion Gmail pour l’admin
const generateAuthUrl = () => {
  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.modify",
  ];
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
};

// Callback pour récupérer le refresh_token et le stocker côté admin
const handleOAuthCallback = async (adminId, code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // stocker le refresh_token pour cet admin
  const admin = await Admin.findByIdAndUpdate(
    adminId,
    { gmailRefreshToken: tokens.refresh_token },
    { new: true }
  );
  return admin;
};

module.exports = { generateAuthUrl, handleOAuthCallback, oAuth2Client };
