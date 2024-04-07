const bcrypt = require('bcrypt');
const { models } = require('mongoose');

const hashpassword = async (password) => {
    try {
        const saltrounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltrounds);
        return hashedpassword;
    } catch (err) {
        console.log(err);
    }
}

const comparepassword = async (password, hashedpassword) => {
    return bcrypt.compare(password, hashedpassword);
}


module.exports = {
    hashpassword,
    comparepassword
};