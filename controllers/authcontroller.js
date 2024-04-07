const express = require('express');
const usermodel = require('../models/usermodel.js')
const jwt = require('jsonwebtoken')
const { hashpassword, comparepassword } = require('./../helpers/authhelper.js');


const users = require('../models/usermodel');

const registercontroller = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //valid

        if (!name) {
            return res.send({ err: 'Name is required' })
        }
        if (!email) {
            return res.send({ err: 'email is required' })
        }
        if (!password) {
            return res.send({ err: 'password is required' })
        }
        if (!phone) {
            return res.send({ err: 'phone is required' })
        }
        if (!address) {
            return res.send({ err: 'address is required' })
        }

        //existing user

        const existinguser = await usermodel.findOne({ email })
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: 'Already registered please login'
            })
        }

        const hashedpassword = await hashpassword(password)

        const user = await new users({ name, email, phone, address, password: hashedpassword }).save();


        res.status(201).send({
            success: true,
            message: 'User registered',
            user,
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            err
        })
    }
}


//nlogin

const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invalid username or password"
            })
        }
        const user = await usermodel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email not registered"
            })
        }
        const match = await comparepassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        //token

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"

        });
        res.status(200).send({
            success: true,
            message: "login success",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "error in login",
            err
        })

    }
}
const testcontroller = async (req, res) => {
    console.log('protected route')

}


module.exports = {
    registercontroller,
    logincontroller,
    testcontroller
};
