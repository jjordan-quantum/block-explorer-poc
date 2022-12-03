require('dotenv').config();

exports.settings = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    providerUrl: process.env.PROVIDER_URL || 'https://rpc.ankr.com/eth',
};
