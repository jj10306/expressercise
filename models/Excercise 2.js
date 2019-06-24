const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const ExcerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }


});

module.export = Excercise = mongoose.model('excercise', ExcerciseSchema);
