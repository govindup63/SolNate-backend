const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (to, donationLink) => {
  if (!to) {
    throw new Error('Recipient email address is required.');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,  // Ensure this field is correctly populated
    subject: 'Donation Link',
    text: `Thank you for your submission! Here is your unique donation link: ${donationLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
};
