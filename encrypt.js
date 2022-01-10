const PublicKey = require("./models/PublicKey")
const crypto = require("crypto");

const encrypt = async (id, data) => {
    try {
        const keyObject = await PublicKey.findOne({userId: id});
        const publicKey = keyObject.key
    
        if (!publicKey) {
            console.error("Public Key Not Found")
            return -1;
        }
        const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
        console.log(encryptedData.toString("base64"));
        return encryptedData.toString("base64");
    } catch (error) {
        console.error(error)
        return -1;
    }
};

module.exports = { encrypt };
