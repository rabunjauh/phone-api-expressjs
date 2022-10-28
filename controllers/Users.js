import Users from "../models/Users.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                name: req.body.name
            }
        });
        // decode password input by user with password in database
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ message: "Wrong Password" });
        const id = user[0].id;
        const name = user[0].name;
        const status = user[0].status;
        // create json web token
        const accessToken = jwt.sign({ 
            id, name, status 
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '50s',
        });
        // create json web resfresh token
        const refreshToken = jwt.sign({ 
            id, name, status 
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        });
        // update refresh_token inside database
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: id
            }
        });
        // create cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            // for https
            // secure: true
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        if(users.length > 0) {
            res.status(200).json({ "data": users });
        } else {
            res.status(204).json({ message: "No data available" });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getOneUser = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                id: req.params.id
            }
        });
        if(user.length > 0) {
            res.status(200).json({ "data": user });
        } else {
            res.status(204).json({ message: "No data available" });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const searchUser = async(req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                name: {
                    [Op.like]: req.body.search
                }
            }
        });
        if (users.length > 0) {
            res.status(200).json({ "data": users });
        } else {
            res.status(204).json({ message: "No data available" });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createUsers = async(req, res) => {
    const { name, password, confirmPassword, status } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ message: "Password not match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            status: status,
            password: hashPassword
        });

        res.status(201).json({ message: "User added succesfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.status(204);
    const id = user[0].id;
    await Users.update({ 
        refresh_token: null 
    }, {
        where: {
            id: id
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}