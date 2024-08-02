const solanaWeb3 = require('@solana/web3.js');

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

exports.getBalance = async (publicKey) => {
  try {
    const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
    return balance;
  } catch (error) {
    console.error('Error getting balance', error);
    throw error;
  }
};
