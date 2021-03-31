const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../model/User2");


router.post(
    "/add_user",
    [
        check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        check("phone_number",
            "Please enter a phone number").isMobilePhone(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { username, phone_number} = req.body;
        try {
            let user = await User.findOne({
                username
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                phone_number
            });

            await user.save();

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
        res.status(200).send('User created!!!')
    }
);

module.exports = router;
