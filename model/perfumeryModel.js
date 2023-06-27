const mongoose = require('mongoose');
const Schema = mongoose.Schema

const perfumeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const PERFUMES = mongoose.model('newPerfumes', perfumeSchema);

module.exports = PERFUMES;