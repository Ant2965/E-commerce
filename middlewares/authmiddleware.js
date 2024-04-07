const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");
const { use } = require("../routes/authroute");

//protected route


const requiresignin = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        next();
    }
    catch (err) {
        console.log(err);
    }
}



// admin access

const isadmin = async (req, res, next) => {
    try {
        const user = await usermodel.findById(req.user.id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized access'
            })
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    requiresignin,
    isadmin
}