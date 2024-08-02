const QRCode = require('qrcode');
const { FRONTEND_URL } = require('../config');

exports.generateDonationLink = (publicKey) => {
  return `${FRONTEND_URL}/donate/${encodeURIComponent(publicKey)}`;
};

exports.generateQRCode = async (link) => {
  try {
    return await QRCode.toDataURL(link);
  } catch (error) {
    console.error('Error generating QR code', error);
    throw error;
  }
};
