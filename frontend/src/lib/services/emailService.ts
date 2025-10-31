import nodemailer from 'nodemailer';

interface EmailCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendCredentialsEmail = async ({ name, email, username, password }: EmailCredentials) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to the Company - Your Login Credentials',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Our Company!</h2>
        <p>Dear ${name},</p>
        <p>Welcome to our team! Your account has been created successfully. Below are your login credentials:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
        
        <p>Please keep these credentials secure and change your password after your first login.</p>
        <p>You can access the system at: <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}">${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}</a></p>
        
        <p>If you have any questions, please don't hesitate to contact the HR department.</p>
        
        <p>Best regards,<br>HR Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};