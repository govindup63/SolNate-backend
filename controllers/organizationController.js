const { generateDonationLink, generateQRCode } = require('../services/qrCodeService');
const { sendEmail } = require('../services/emailService');
const { getBalance } = require('../utils/solanaUtils'); // Import the getBalance function

exports.createOrganization = async (req, res) => {
  try {
    const { publicKey, email } = req.body;
    // Ensure email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Get balance of the provided public key
    const balance = await getBalance(publicKey);
    console.log(`Balance for public key ${publicKey}: ${balance}`);

    // Generate donation link and QR code
    const donationLink = generateDonationLink(publicKey);
    const qrCode = await generateQRCode(donationLink);
    // Send confirmation email
    await sendEmail(email, donationLink);
    console.log(`Email sent to ${email} with public key ${publicKey} with donation link ${donationLink}`);
    res.json({ donationLink, qrCode, balance });
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation link', error });
  }
}