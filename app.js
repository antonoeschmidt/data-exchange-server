const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Web3 = require("web3");
const Citizen = require("./build/contracts/Citizen.json");
const Data = require("./models/Data");
const publicKeyRoute = require("./routes/publicKey")
const { encrypt } = require("./encrypt");

require("dotenv").config();

app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        err ? console.log(err) : console.log("Connected to DB");
    }
);

app.use("/key", publicKeyRoute)

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);

app.get("/data", async (req, res) => {
    const dataId = req.query.dataid;
    const requester = req.query.requester;
    const owner = req.query.owner;
    const userid = req.query.userid;

    // Get owner contract
    let contract = new web3.eth.Contract(Citizen.abi, owner);

    // See permission for requester
    let permission
    try {
        permission = await contract.methods
        .getPermission(requester, dataId)
        .call();
    } catch (error) {
        console.error("Contract not found. Check that Blockchains are in sync")
    }
    console.log(`permission: ${permission}`);
    
    if (permission) {
        const data = await Data.findById(dataId);
        let enc = await encrypt(userid, data.content);
        if (enc === -1) {
            res.status(500).send({ message: "Public Key Not Found"})
        } else {
            res.status(200).send({ data: enc });
        }
    } else {
        res.status(401).send({ message: "Permission not found" });
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
    );
});
