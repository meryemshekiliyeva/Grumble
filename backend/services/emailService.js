const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate verification code (6 digits)
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send email verification
const sendVerificationEmail = async (email, firstName, verificationCode) => {
  const transporter = createTransporter();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Şikayətvar - Hesab Doğrulama</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .logo { color: white; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .verification-code { background-color: #f8f9fa; border: 2px dashed #dee2e6; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px; }
        .code { font-size: 32px; font-weight: bold; color: #495057; letter-spacing: 4px; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">✓ Grumble</div>
          <h1 style="color: white; margin: 0; font-size: 28px;">Hesab Doğrulama</h1>
        </div>
        
        <div class="content">
          <p style="font-size: 16px; color: #495057; line-height: 1.6;">
            Salam <strong>${firstName}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #495057; line-height: 1.6;">
            Şikayətvar platformasına xoş gəlmisiniz! Hesabınızı aktivləşdirmək üçün aşağıdakı doğrulama kodunu istifadə edin:
          </p>
          
          <div class="verification-code">
            <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">Doğrulama Kodu:</p>
            <div class="code">${verificationCode}</div>
          </div>
          
          <p style="color: #6c757d; font-size: 14px; line-height: 1.6;">
            Bu kod 24 saat ərzində etibarlıdır. Əgər siz bu hesabı yaratmamısınızsa, bu e-postu nəzərə almayın.
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">Hörmətlə,<br><strong>Grumble Komandası</strong></p>
          <p style="margin: 10px 0 0 0; font-size: 12px;">
            Bu e-post avtomatik olaraq göndərilmişdir. Cavab verməyin.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Grumble" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Grumble - Hesab Doğrulama',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};

// Send password reset email
const sendPasswordResetEmail = async (email, firstName, resetCode) => {
  const transporter = createTransporter();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Şikayətvar - Şifrə Yenileme</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .logo { color: white; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .reset-code { background-color: #f8f9fa; border: 2px dashed #dee2e6; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px; }
        .code { font-size: 32px; font-weight: bold; color: #495057; letter-spacing: 4px; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">✓ Grumble</div>
          <h1 style="color: white; margin: 0; font-size: 28px;">Şifrə Yenileme</h1>
        </div>
        
        <div class="content">
          <p style="font-size: 16px; color: #495057; line-height: 1.6;">
            Salam <strong>${firstName}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #495057; line-height: 1.6;">
            Şifrənizi yeniləmək üçün aşağıdakı kodu istifadə edin:
          </p>
          
          <div class="reset-code">
            <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">Şifrə Yenileme Kodu:</p>
            <div class="code">${resetCode}</div>
          </div>
          
          <p style="color: #dc3545; font-size: 14px; margin-top: 30px; padding: 15px; background-color: #f8d7da; border-radius: 8px;">
            <strong>Diqqət:</strong> Bu kod 1 saat ərzində etibarlıdır. Əgər şifrə yenileme tələbi sizə aid deyilsə, bu e-postu nəzərə almayın.
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">Hörmətlə,<br><strong>Grumble Komandası</strong></p>
          <p style="margin: 10px 0 0 0; font-size: 12px;">
            Bu e-post avtomatik olaraq göndərilmişdir. Cavab verməyin.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Grumble" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Grumble - Şifrə Yenileme',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  generateVerificationToken,
  generateVerificationCode,
  sendVerificationEmail,
  sendPasswordResetEmail
};
