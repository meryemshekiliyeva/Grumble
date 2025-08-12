// Email service for sending authentication emails
export const emailService = {
  // Send email verification for new user registration
  sendVerificationEmail: async (email, verificationCode) => {
    const subject = "Şikayətvar - Üyelik Oluşturmak için Son Adım";
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Şikayətvar E-Posta Doğrulama</title>
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
          .social-links { margin: 20px 0; }
          .social-links a { margin: 0 10px; color: #6c757d; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">✓ şikayətvar</div>
            <h1 style="color: white; margin: 0; font-size: 28px;">Üyelik Oluşturmak için Son Adım</h1>
          </div>
          
          <div class="content">
            <p style="font-size: 16px; color: #495057; line-height: 1.6;">
              Üyelik işleminizi tamamlamak için lütfen e-posta adresinizin doğruluğunu onaylayın.
            </p>
            
            <div class="verification-code">
              <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">Doğrulama Kodu:</p>
              <div class="code">${verificationCode}</div>
            </div>
            
            <p style="color: #6c757d; font-size: 14px; line-height: 1.6;">
              Bu kodu şikayətvar.com saytında daxil edərək hesabınızı aktivləşdirin.
            </p>
            
            <div style="text-align: center;">
              <a href="https://sikayetvar.com/verify" class="button">E-posta Adrəsini Doğrula</a>
            </div>
            
            <p style="color: #6c757d; font-size: 12px; margin-top: 30px;">
              Bu e-posta sizə gönderilmiştir çünki şikayətvar.com saytında hesab yaratmaq üçün bu e-posta adrəsini istifadə etmisiniz.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">Saygılarımızla,<br><strong>www.sikayetvar.com</strong></p>
            
            <div class="social-links">
              <a href="#">Facebook</a> |
              <a href="#">Twitter</a> |
              <a href="#">Instagram</a> |
              <a href="#">YouTube</a> |
              <a href="#">LinkedIn</a>
            </div>
            
            <p style="margin: 10px 0 0 0; font-size: 12px;">
              Şikayətvar ilə ilgili tüm sorularınız için <a href="mailto:help@sikayetvar.com">Yardım Sayfasına Git</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // In a real application, this would send the email via an email service
    console.log('Sending verification email to:', email);
    console.log('Verification code:', verificationCode);
    console.log('Email content:', htmlContent);
    
    // Simulate email sending
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, messageId: 'mock-message-id' });
      }, 1000);
    });
  },

  // Send password reset email
  sendPasswordResetEmail: async (email, userName, resetCode) => {
    const subject = "Şikayətvar Şifrə Yenileme";
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Şikayətvar Şifrə Yenileme</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
          .logo { color: white; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { padding: 40px 30px; }
          .reset-code { background-color: #f8f9fa; border: 2px dashed #dee2e6; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px; }
          .code { font-size: 32px; font-weight: bold; color: #495057; letter-spacing: 4px; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
          .social-links { margin: 20px 0; }
          .social-links a { margin: 0 10px; color: #6c757d; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">✓ şikayətvar</div>
            <h1 style="color: white; margin: 0; font-size: 28px;">Şifrə Yenileme</h1>
          </div>
          
          <div class="content">
            <p style="font-size: 16px; color: #495057; line-height: 1.6;">
              Mərhaba <strong>${userName}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #495057; line-height: 1.6;">
              "${resetCode}" Kodunu şifrənizi belirləmək için kullanabilir veya bağlantıya tıklayabilirsiniz.
            </p>
            
            <div class="reset-code">
              <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">Şifrə Yenileme Kodu:</p>
              <div class="code">${resetCode}</div>
            </div>
            
            <p style="color: #6c757d; font-size: 14px; line-height: 1.6;">
              Şifrənizi yeniləmək için lütfen <a href="https://sikayetvar.com/reset-password" style="color: #667eea;">tıklayınız</a>.
            </p>
            
            <div style="text-align: center;">
              <a href="https://sikayetvar.com/reset-password" class="button">Şifrəni Yenilə</a>
            </div>
            
            <p style="color: #dc3545; font-size: 14px; margin-top: 30px; padding: 15px; background-color: #f8d7da; border-radius: 8px;">
              <strong>Diqqət:</strong> Əgər şifrə yenileme tələbi sizə aid deyilsə, bu e-postu nəzərə almayın.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">Saygılarımızla,<br><strong>www.sikayetvar.com</strong></p>
            
            <div class="social-links">
              <a href="#">Facebook</a> |
              <a href="#">Twitter</a> |
              <a href="#">Instagram</a> |
              <a href="#">YouTube</a> |
              <a href="#">LinkedIn</a>
            </div>
            
            <p style="margin: 10px 0 0 0; font-size: 12px;">
              Şikayətvar ilə ilgili tüm sorularınız için <a href="mailto:help@sikayetvar.com">Yardım Sayfasına Git</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // In a real application, this would send the email via an email service
    console.log('Sending password reset email to:', email);
    console.log('Reset code:', resetCode);
    console.log('Email content:', htmlContent);
    
    // Simulate email sending
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, messageId: 'mock-message-id' });
      }, 1000);
    });
  }
};
