const express = require("express");
const PublicKey = require("../models/PublicKey");
const router = express.Router();

// Get all keys
router.get("/", async (req, res) => {
    try {
        const keys = await PublicKey.find();
        res.json(keys);
    } catch (error) {
        res.send(error);
    }
});

// Get key user from _id
router.get("/:id", async (req, res) => {
    try {
        const key = await PublicKey.findById(req.params.id);
        res.json(key);
    } catch (err) {
        res.send(err);
    }
});

router.post("/", async (req, res) => {
    const key = new PublicKey({
        userId: req.body.userId,
        key: req.body.key
    });
    try {
        const newKey = await key.save();
        res.json(newKey);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
