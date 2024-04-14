// user.route.js
const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
const userController = express.Router();

userController.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 6); // Wait for hash generation
        const user = new UserModel({
            email,
            password: hash
        });
        await user.save();
        res.status(201).json({ message: "Signup successful" }); // Send JSON response
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Send JSON response
    }
});

userController.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" }); // Send JSON response
        }
        const hash = user.password;
        const match = await bcrypt.compare(password, hash); // Wait for comparison
        if (match) {
            const token = jwt.sign({ email, userId: user._id }, "secret");
            return res.json({ message: "Login successful", token, id: user._id }); // Send JSON response
        } else {
            return res.status(400).json({ message: "Invalid Credentials" }); // Send JSON response
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Send JSON response
    }
});

module.exports = userController;
