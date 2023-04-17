import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

// register user
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            rankLists: new Array()
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// user log in
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({ msg: "User does not exist!"});
        }
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) {
            return res.status(400).json({ msg: "Invalid password!"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}