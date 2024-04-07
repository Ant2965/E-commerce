const mongoose = require('mongoose')
const colors = require('colors');
const connectdb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log(`conntected to db ${con.connection.host}`.bgMagenta.white);
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = connectdb;