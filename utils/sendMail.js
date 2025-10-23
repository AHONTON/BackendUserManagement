const nodemailer = require("nodemailer");

const sendValidationEmail = async (email, token, nom, prenom, photo) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const url = `${process.env.FRONTEND_URL}/validate?token=${token}`;
  const fullName = `${prenom} ${nom}`;

  await transporter.sendMail({
    from: `"Admin App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Validation de votre compte administrateur",
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px; background:#cce0ff; border-radius:8px; max-width:600px; margin:auto;">
        <h2 style="color:#333;">Bonjour ${fullName}, 🎉</h2>
        <p>Bienvenue en tant qu'administrateur de notre plateforme.</p>
        
        <div style="text-align:center; margin:20px 0;">
          <img src="${process.env.BACKEND_URL}/uploads/admins/${photo}" alt="Photo de ${fullName}" width="120" height="120" style="border-radius:50%; object-fit:cover;" />
          <p style="font-size:16px; font-weight:bold; margin-top:10px;">${fullName}</p>
        </div>
        
        <p>Veuillez cliquer sur le bouton ci-dessous pour valider votre compte :</p>
        
        <div style="text-align:center; margin:30px 0;">
          <a href="${url}" style="background:#4CAF50; color:white; padding:12px 24px; text-decoration:none; border-radius:5px; font-weight:bold;">Valider mon compte</a>
        </div>
        
        <p style="color:#888; font-size:14px;">Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.</p>
      </div>
    `,
  });
};

module.exports = { sendValidationEmail };
