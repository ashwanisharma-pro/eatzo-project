const nodemailer = require('nodemailer');

// ==========================================
// PREMIUM EMAIL TEMPLATES
// ==========================================

const welcomeTemplate = (userName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:40px auto;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.5);border:1px solid rgba(0,255,157,0.15);">
    
    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#001a0d 0%,#003320 50%,#00100a 100%);padding:50px 40px;text-align:center;position:relative;">
      <div style="display:inline-block;background:linear-gradient(135deg,#00ff9d,#00b36e);-webkit-background-clip:text;color:transparent;margin-bottom:5px;">
        <h1 style="margin:0;font-size:42px;font-weight:900;letter-spacing:-2px;color:#00ff9d;">🍽️ EATZO</h1>
      </div>
      <p style="margin:8px 0 0;font-size:13px;letter-spacing:4px;color:#00d4aa;opacity:0.8;text-transform:uppercase;">Delicious Moments Delivered</p>
    </div>

    <!-- HERO SECTION -->
    <div style="background:linear-gradient(180deg,#0d1f2d 0%,#0a1520 100%);padding:50px 40px;text-align:center;">
      <div style="font-size:60px;margin-bottom:20px;">🎉</div>
      <h2 style="color:#ffffff;font-size:28px;font-weight:800;margin:0 0 15px;line-height:1.3;">
        Welcome to Eatzo, <span style="color:#00ff9d">${userName}</span>!
      </h2>
      <p style="color:#8fb8d4;font-size:16px;line-height:1.7;margin:0 0 30px;">
        Your account has been successfully created. You are now part of the Eatzo family — where every craving has a destination.
      </p>

      <!-- CTA BUTTON -->
      <a href="http://localhost:3000/restaurants" 
         style="display:inline-block;padding:18px 45px;background:linear-gradient(135deg,#00b36e,#00ff9d);color:#000;text-decoration:none;border-radius:50px;font-weight:800;font-size:16px;letter-spacing:0.5px;box-shadow:0 10px 30px rgba(0,255,157,0.3);margin-bottom:20px;">
        🚀 Start Ordering Now
      </a>
    </div>

    <!-- FEATURES SECTION -->
    <div style="background:#0a1520;padding:40px;border-top:1px solid rgba(0,255,157,0.08);">
      <h3 style="color:#00d4ff;font-size:16px;text-align:center;margin:0 0 30px;letter-spacing:2px;text-transform:uppercase;">What Awaits You</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="width:33%;text-align:center;padding:15px 10px;">
            <div style="font-size:32px;margin-bottom:10px;">🍕</div>
            <div style="color:#00ff9d;font-weight:700;font-size:14px;margin-bottom:5px;">100+ Restaurants</div>
            <div style="color:#64748b;font-size:12px;">Top local restaurants</div>
          </td>
          <td style="width:33%;text-align:center;padding:15px 10px;border-left:1px solid rgba(255,255,255,0.05);border-right:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:32px;margin-bottom:10px;">⚡</div>
            <div style="color:#00ff9d;font-weight:700;font-size:14px;margin-bottom:5px;">Fast Delivery</div>
            <div style="color:#64748b;font-size:12px;">30 min guaranteed</div>
          </td>
          <td style="width:33%;text-align:center;padding:15px 10px;">
            <div style="font-size:32px;margin-bottom:10px;">🔒</div>
            <div style="color:#00ff9d;font-weight:700;font-size:14px;margin-bottom:5px;">Secure Payment</div>
            <div style="color:#64748b;font-size:12px;">Safe & encrypted</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- FOOTER -->
    <div style="background:#060e1a;padding:25px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
      <p style="color:#334155;font-size:12px;margin:0 0 8px;">
        © 2026 Eatzo Food Delivery. All rights reserved.
      </p>
      <p style="color:#1e3a52;font-size:11px;margin:0;">
        You received this email because you registered on Eatzo.
      </p>
    </div>
  </div>
</body>
</html>
`;

const orderConfirmationTemplate = (userName, orderId, items, totalPrice) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:12px 0;color:#cbd5e1;font-size:14px;border-bottom:1px solid rgba(255,255,255,0.05);">
        ${item.name} × ${item.quantity}
      </td>
      <td style="padding:12px 0;color:#00ff9d;font-size:14px;font-weight:700;text-align:right;border-bottom:1px solid rgba(255,255,255,0.05);">
        ₹${item.price * item.quantity}
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:40px auto;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.5);border:1px solid rgba(0,119,255,0.2);">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#001a0d,#003320,#00100a);padding:40px;text-align:center;">
      <h1 style="margin:0;font-size:36px;font-weight:900;color:#00ff9d;">🍽️ EATZO</h1>
      <p style="margin:6px 0 0;font-size:12px;letter-spacing:4px;color:#00d4aa;text-transform:uppercase;">Order Confirmed</p>
    </div>

    <!-- MAIN -->
    <div style="background:#0d1f2d;padding:40px;">
      <div style="text-align:center;margin-bottom:30px;">
        <div style="font-size:50px;margin-bottom:15px;">✅</div>
        <h2 style="color:#ffffff;font-size:24px;margin:0 0 10px;">Order Placed Successfully!</h2>
        <p style="color:#8fb8d4;font-size:15px;margin:0;">Hey <strong style="color:#00ff9d">${userName}</strong>, your food is on its way!</p>
      </div>

      <!-- ORDER BADGE -->
      <div style="background:rgba(0,119,255,0.08);border:1px solid rgba(0,119,255,0.2);border-radius:12px;padding:15px;text-align:center;margin-bottom:30px;">
        <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Order ID</span><br>
        <strong style="color:#00d4ff;font-size:18px;letter-spacing:1px;">#${String(orderId).substring(0,8).toUpperCase()}</strong>
      </div>

      <!-- ORDER ITEMS -->
      <div style="background:rgba(0,0,0,0.2);border-radius:12px;padding:20px;margin-bottom:20px;">
        <h3 style="color:#00d4ff;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin:0 0 15px;">Order Summary</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${itemsHtml}
          <tr>
            <td style="padding:15px 0 5px;color:#ffffff;font-size:16px;font-weight:700;">Total</td>
            <td style="padding:15px 0 5px;color:#00ff9d;font-size:20px;font-weight:900;text-align:right;">₹${totalPrice}</td>
          </tr>
        </table>
      </div>

      <!-- DELIVERY INFO -->
      <div style="background:rgba(0,255,157,0.05);border:1px solid rgba(0,255,157,0.15);border-radius:12px;padding:20px;text-align:center;">
        <div style="font-size:28px;margin-bottom:10px;">🚴</div>
        <p style="color:#00ff9d;font-weight:700;margin:0 0 5px;">Ramesh Kumar is on his way!</p>
        <p style="color:#64748b;font-size:13px;margin:0;">Estimated delivery: 25-35 minutes</p>
      </div>

      <!-- TRACK BUTTON -->
      <div style="text-align:center;margin-top:30px;">
        <a href="http://localhost:3000/orders" 
           style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#0055cc,#0077ff);color:#fff;text-decoration:none;border-radius:50px;font-weight:800;font-size:15px;box-shadow:0 10px 25px rgba(0,119,255,0.3);">
          📦 Track My Order
        </a>
      </div>
    </div>

    <!-- FOOTER -->
    <div style="background:#060e1a;padding:25px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
      <p style="color:#334155;font-size:12px;margin:0;">© 2026 Eatzo Food Delivery. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

const otpTemplate = (userName, otp) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:40px auto;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.5);border:1px solid rgba(0,212,255,0.2);">
    
    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#00101a,#002c44,#00101a);padding:40px;text-align:center;">
       <h1 style="margin:0;font-size:36px;font-weight:900;color:#00d4ff;">🍽️ EATZO</h1>
       <p style="margin:6px 0 0;font-size:12px;letter-spacing:4px;color:#0077ff;text-transform:uppercase;">Email Verification</p>
    </div>

    <!-- MAIN -->
    <div style="background:#0d1f2d;padding:50px 40px;text-align:center;">
      <h2 style="color:#ffffff;font-size:24px;margin:0 0 15px;">Verify Your Identity</h2>
      <p style="color:#8fb8d4;font-size:16px;line-height:1.6;margin:0 0 30px;">
        Hey <strong style="color:#00d4ff">${userName}</strong>, use the following One-Time Password (OTP) to complete your registration. This code is valid for 10 minutes.
      </p>

      <!-- OTP CODE -->
      <div style="background:rgba(0,212,255,0.08);border:1px dashed rgba(0,212,255,0.3);border-radius:12px;padding:25px;margin-bottom:30px;display:inline-block;min-width:200px;">
        <span style="color:#00d4ff;font-size:42px;font-weight:900;letter-spacing:10px;text-shadow:0 0 20px rgba(0,212,255,0.3);">${otp}</span>
      </div>

      <p style="color:#64748b;font-size:13px;margin:0;">
        If you didn't request this code, please ignore this email.
      </p>
    </div>

    <!-- FOOTER -->
    <div style="background:#060e1a;padding:25px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
      <p style="color:#334155;font-size:12px;margin:0;">© 2026 Eatzo Food Delivery. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const forgotPasswordTemplate = (userName, resetUrl) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:40px auto;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.5);border:1px solid rgba(251,191,36,0.2);">
    
    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#1a1400,#332600,#1a1400);padding:40px;text-align:center;">
       <h1 style="margin:0;font-size:36px;font-weight:900;color:#fbbf24;">🍽️ EATZO</h1>
       <p style="margin:6px 0 0;font-size:12px;letter-spacing:4px;color:#f59e0b;text-transform:uppercase;">Password Recovery</p>
    </div>

    <!-- MAIN -->
    <div style="background:#0d1f2d;padding:50px 40px;text-align:center;">
      <h2 style="color:#ffffff;font-size:24px;margin:0 0 15px;">Reset Your Password</h2>
      <p style="color:#8fb8d4;font-size:16px;line-height:1.6;margin:0 0 30px;">
        Hey <strong style="color:#fbbf24">${userName}</strong>, we received a request to reset your password. If you didn't make this request, you can safely ignore this email.
      </p>

      <!-- RESET BUTTON -->
      <a href="${resetUrl}" 
         style="display:inline-block;padding:18px 45px;background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#000;text-decoration:none;border-radius:50px;font-weight:800;font-size:16px;box-shadow:0 10px 30px rgba(251,191,36,0.2);margin-bottom:30px;">
        🔐 Reset Password Now
      </a>

      <p style="color:#64748b;font-size:13px;margin:20px 0 0;">
        For security, this link will expire in 60 minutes.
      </p>
    </div>

    <!-- FOOTER -->
    <div style="background:#060e1a;padding:25px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
      <p style="color:#334155;font-size:12px;margin:0;">© 2026 Eatzo Food Delivery. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// ==========================================
// SEND EMAIL FUNCTION
// ==========================================
const sendEmail = async (options) => {
  try {
    let transporter;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Ethereal test-mode fallback
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Choose correct template based on type
    let htmlContent;
    if (options.type === 'welcome') {
      htmlContent = welcomeTemplate(options.userName);
    } else if (options.type === 'order' && options.orderItems) {
      htmlContent = orderConfirmationTemplate(
        options.userName,
        options.orderId,
        options.orderItems,
        options.totalPrice
      );
    } else if (options.type === 'otp') {
      htmlContent = otpTemplate(options.userName, options.otp);
    } else if (options.type === 'forgot') {
      htmlContent = forgotPasswordTemplate(options.userName, options.resetUrl);
    } else {
      htmlContent = options.html || `<p>${options.message}</p>`;
    }

    const mailOptions = {
      from: '"Eatzo 🍽️" <noreply@eatzo.com>',
      to: options.email,
      subject: options.subject,
      text: options.message || '',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('\n✅ Email sent: %s', info.messageId);

    if (!process.env.EMAIL_USER) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 EMAIL PREVIEW (Click to open in browser):');
      console.log('🔗 ' + nodemailer.getTestMessageUrl(info));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.log('📬 Real email sent successfully to', options.email);
    }

  } catch (error) {
    console.error('❌ Email could not be sent:', error.message);
  }
};

module.exports = sendEmail;
