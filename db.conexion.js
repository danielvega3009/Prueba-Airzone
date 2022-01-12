const mongoose = require('mongoose');

const conexionDB = async ()=> {
    try {
        const DB = await mongoose.connect('mongodb://localhost:27017/test-clima');
        console.log("conexion correcta", DB.connection.name);
    } catch (error){
        console.log(error);
    }
}


module.exports = conexionDB;