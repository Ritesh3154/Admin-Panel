const { default: mongoose } = require('mongoose');
const { app } = require('../server');

exports.dbConnect = () => {
    mongoose.connect('mongodb://localhost:27017/admin')
        .then(() => {
            console.log("connected..👍");
        })
        .catch((err) => {
            console.log(err);
        })
}

