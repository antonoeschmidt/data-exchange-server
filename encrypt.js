const { privateKeys, publicKeys } = require("./keys.js");
const crypto = require("crypto");

const encrypt = (account, data) => {
    const publicKey = publicKeys[account];
    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(data)
    );
    console.log(encryptedData.toString("base64"));
    return encryptedData.toString("base64");
};

const decrypt = (account, encryptedData) => {
    const privateKey = privateKeys[account];
    encryptedData = encryptedData.replace(/ /g, "+")

    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(encryptedData, 'base64')
    );
    console.log("decrypted data: ", decryptedData.toString());
    return decryptedData.toString();
};

module.exports = { encrypt, decrypt };
