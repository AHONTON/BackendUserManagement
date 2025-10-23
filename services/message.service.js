const { google } = require("googleapis");
const Admin = require("../models/admin.model");
const { createMessage } = require("../repositories/message.repository");

const fetchAdminEmails = async (adminId) => {
  const admin = await Admin.findById(adminId);
  if (!admin?.gmailRefreshToken)
    throw new Error("Admin n'a pas connecté Gmail");

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: admin.gmailRefreshToken });
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const res = await gmail.users.messages.list({ userId: "me", maxResults: 10 });
  const messages = [];

  for (const msg of res.data.messages || []) {
    const fullMsg = await gmail.users.messages.get({
      userId: "me",
      id: msg.id,
    });
    const headers = fullMsg.data.payload.headers;
    const from = headers.find((h) => h.name === "From")?.value || "";
    const to = headers.find((h) => h.name === "To")?.value || "";
    const subject = headers.find((h) => h.name === "Subject")?.value || "";
    const body = fullMsg.data.snippet;

    const savedMsg = await createMessage({
      adminId,
      gmailId: msg.id,
      from,
      to,
      subject,
      body,
    });
    messages.push(savedMsg);
  }

  return messages;
};

module.exports = { fetchAdminEmails };
