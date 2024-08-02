const { generateDonationLink, generateQRCode } = require('../services/qrCodeService');
const { sendEmail } = require('../services/emailService');

exports.createOrganization = async (req, res) => {
  try {
    const { publicKey, email } = req.body;

    // Generate donation link and QR code
    const donationLink = generateDonationLink(publicKey);
    const qrCode = await generateQRCode(donationLink);

    // Ensure email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Send confirmation email
    await sendEmail(email, donationLink);
    console.log(`Email sent to ${email} with public key ${publicKey} with donation link ${donationLink}`);
    res.json({ donationLink, qrCode });
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation link', error });
  }
};
