const router = require('express').Router();
const User = require('../model/User.model'); 
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/login');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user using POST request /api/auth/createUser
router.post('/createUser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    let success = false; // Declare and initialize success variable
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check if user exists with the same email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User with this email already exists" });
        }

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some internal error occurred");
    }
});

// Login user using POST request /api/auth/login
router.post('/login', [
    body('email').isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    let success = false; // Declare and initialize success variable
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please check your email and password" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please check your email and password" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error occurred");
    }
});

// Get logged-in user details using POST request /api/auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some internal error occurred");
    }
});

module.exports = router;