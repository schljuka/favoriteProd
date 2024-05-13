const mongoose = require('mongoose');

const connectDatabase = () => {

    mongoose.connect(process.env.DB_LOCAL_URI, {
    }).then(con => {
        console.log(`MongoDB Database connect with HOST: ${con.connection.host}`);
    }).catch(err => {
        console.error(`Error with Database connection: ${err.message}`);
    });
}

module.exports = connectDatabase