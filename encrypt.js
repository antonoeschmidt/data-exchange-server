const { publicKeys } = require("./keys.js");
const crypto = require("crypto");

const encrypt = (account, data) => {
    const publicKey = publicKeys[account];
    const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
    console.log(encryptedData.toString("base64"));
    return encryptedData.toString("base64");
};

module.exports = { encrypt };
