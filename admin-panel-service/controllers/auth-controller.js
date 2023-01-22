import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import crypto from "crypto";

import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { sendEmail } from "../utils/sendEmail.js";
import Token from "../models/token.js";


export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save((error, registeredUser) => {
            if (error) {
                console.log(error)
            } else {
                let payload = { subject: registeredUser._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token })
            }
        });

    } catch (err) {
        next(err)
    }

}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        });

        if (!user) return next(createError(404, 'User not found!'));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect)
            return next(createError(400, 'Wrong password or username!'));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({ ...otherDetails });

    } catch (err) {
        next(err)
    }

}

export const passwordReset = async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(400).send("User with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });

        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        // const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        const link = `Your password reset key given below :
            ${user._id}/${token.token}`;
        console.log('link:', link)
        await sendEmail(user.email, "Password reset", link);

        res.send({ 'statusText': 'Password reset link sent to your email account!' });
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }

}

export const passwordUpdated = async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);

        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        
        if (!token) return res.status(400).send("Invalid link or expired");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        user.password = hash;
        await user.save();
        await token.delete();

        res.send({ 'statusText': 'Password reset sucessfully!' });
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}