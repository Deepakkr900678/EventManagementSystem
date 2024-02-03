const { userModel } = require("../db/db");
const { createUserSchema } = require("../requestSchema/user");
const { validationError, successResponse } = require("../helper/responseTemplate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        let { error, value } = createUserSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error && error.details) {
            return res.status(422).json({ errors: error.details });
        }

        let salt = await bcrypt.genSalt();
        let passwordHash = await bcrypt.hash(value.password, salt);

        const newUser = new userModel({
            ...value,
            password: passwordHash,
        });

        let user = await newUser.save();

        const token = jwt.sign({ userId: user._id }, 'abcdefghijklmnopqrstuvwxyz');

        user.token = token;
        await user.save();

        res.status(201).json(
            await successResponse(
                "Successfully created",
                { user }
            )
        );
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(422).json({ errors: await validationError(err) });
        }
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createUser,
};


