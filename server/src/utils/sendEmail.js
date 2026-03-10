import transporter from '../config/email.js';

export async function sendEmail({ to, subject, html }) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}

export function contactNotificationEmail({ name, email, company, details }) {
  return {
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <h3>Project Details:</h3>
      <p>${details}</p>
    `,
  };
}
