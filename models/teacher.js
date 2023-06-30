const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    dob: {
        type: Date,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
});

var Teachers = mongoose.model('Teacher', teacherSchema);
module.exports = Teachers;