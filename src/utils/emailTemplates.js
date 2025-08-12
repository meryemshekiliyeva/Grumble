// Email templates for Grumble platform

export const getRegistrationEmailTemplate = (userName, userEmail) => {
  return {
    subject: "Üyelik Oluşturmak için Son Adım",
    html: `
      <!DOCTYPE html>
      <html lang="az">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Grumble - Üyelik Təsdiqi</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 24px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 20px;
          }
          .logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin: 0;
          }
          .content {
            margin: 30px 0;
            font-size: 16px;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
          .social-links {
            text-align: center;
            margin: 20px 0;
          }
          .social-link {
            display: inline-block;
            margin: 0 10px;
            width: 40px;
            height: 40px;
            background: #f3f4f6;
            border-radius: 50%;
            text-decoration: none;
            color: #6b7280;
          }
          .youtube-banner {
            background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
            color: white;
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
          }
          .youtube-banner a {
            color: white;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <div class="logo-icon">💬</div>
              grumble
            </div>
            <h1 class="title">Üyelik Oluşturmak için Son Adım</h1>
          </div>
          
          <div class="content">
            <p>Üyelik işleminizi tamamlamak için lütfen e-posta adresinizin doğruluğunu onaylayın.</p>
            
            <div style="text-align: center;">
              <a href="#" class="button">E-posta Adresini Doğrula</a>
            </div>
          </div>
          
          <div class="youtube-banner">
            <p style="margin: 0;">
              🎥 <a href="#">Grumble'ı Youtube'da takip etmeyi unutmayın!</a>
            </p>
          </div>
          
          <div class="footer">
            <p>Saygılarımızla,<br>
            <a href="https://www.grumble.az" style="color: #10b981; text-decoration: none;">www.grumble.az</a></p>
            
            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">🐦</a>
              <a href="#" class="social-link">📷</a>
              <a href="#" class="social-link">🎥</a>
              <a href="#" class="social-link">💼</a>
            </div>
            
            <p style="text-align: center; font-size: 12px; color: #9ca3af;">
              Grumble ile ilgili tüm sorularınız için <a href="#" style="color: #3b82f6;">Yardım Sayfasına Git</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Grumble - Üyelik Təsdiqi
      
      Üyelik işleminizi tamamlamak için lütfen e-posta adresinizin doğruluğunu onaylayın.
      
      E-posta adresinizi doğrulamak üçün bu linki tıklayın: [Doğrulama Linki]
      
      Saygılarımızla,
      www.grumble.az
    `
  };
};

export const getPasswordResetEmailTemplate = (userName, resetCode) => {
  return {
    subject: "Grumble Şifrə Yeniləmə",
    html: `
      <!DOCTYPE html>
      <html lang="az">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Grumble - Şifrə Yeniləmə</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 24px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 20px;
          }
          .logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin: 0;
          }
          .content {
            margin: 30px 0;
            font-size: 16px;
            line-height: 1.6;
          }
          .code-box {
            background: #f3f4f6;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
          }
          .reset-code {
            font-size: 32px;
            font-weight: bold;
            color: #3b82f6;
            letter-spacing: 4px;
            font-family: 'Courier New', monospace;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
          .warning {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            color: #92400e;
          }
          .social-links {
            text-align: center;
            margin: 20px 0;
          }
          .social-link {
            display: inline-block;
            margin: 0 10px;
            width: 40px;
            height: 40px;
            background: #f3f4f6;
            border-radius: 50%;
            text-decoration: none;
            color: #6b7280;
          }
          .youtube-banner {
            background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
            color: white;
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
          }
          .youtube-banner a {
            color: white;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <div class="logo-icon">💬</div>
              grumble
            </div>
            <h1 class="title">Merhaba ${userName},</h1>
          </div>
          
          <div class="content">
            <p>"${resetCode}" Kodunu şifrenizi belirlemek için kullanabilir veya bağlantıya tıklayabilirsiniz.</p>
            
            <div class="code-box">
              <div class="reset-code">${resetCode}</div>
            </div>
            
            <p>Şifrenizi yenilemek için lütfen <a href="#" style="color: #3b82f6;">tıklayınız</a>.</p>
            
            <div class="warning">
              <strong>⚠️ Təhlükəsizlik xəbərdarlığı:</strong> Bu kodu heç kimlə paylaşmayın. Grumble komandası heç vaxt sizə bu kodu soruşmayacaq.
            </div>
          </div>
          
          <div class="youtube-banner">
            <p style="margin: 0;">
              🎥 <a href="#">Grumble'ı Youtube'da takip etmeyi unutmayın!</a>
            </p>
          </div>
          
          <div class="footer">
            <p>Saygılarımızla,<br>
            <a href="https://www.grumble.az" style="color: #3b82f6; text-decoration: none;">www.grumble.az</a></p>
            
            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">🐦</a>
              <a href="#" class="social-link">📷</a>
              <a href="#" class="social-link">🎥</a>
              <a href="#" class="social-link">💼</a>
            </div>
            
            <p style="text-align: center; font-size: 12px; color: #9ca3af;">
              Grumble ile ilgili tüm sorularınız için <a href="#" style="color: #3b82f6;">Yardım Sayfasına Git</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Grumble - Şifrə Yeniləmə
      
      Merhaba ${userName},
      
      "${resetCode}" Kodunu şifrenizi belirlemek için kullanabilir veya bağlantıya tıklayabilirsiniz.
      
      Təhlükəsizlik xəbərdarlığı: Bu kodu heç kimlə paylaşmayın.
      
      Saygılarımızla,
      www.grumble.az
    `
  };
};

// Mock email sending function
export const sendEmail = async (to, template) => {
  console.log('📧 Email sent to:', to);
  console.log('📧 Subject:', template.subject);
  console.log('📧 Content:', template.text);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, messageId: `msg_${Date.now()}` };
};
