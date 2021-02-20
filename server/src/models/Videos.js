const { Schema, model } = require('mongoose');

const newSchemaVideos = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    urlVideos: {
        type: String,
        required: true,
        trim: true
    },
    tag: {
        type: String,
        required: true
    },
    userVideos: {
        type: Schema.ObjectId,
        ref: 'Users1'
    }
}, { timestamps: true });

module.exports = model('Videos', newSchemaVideos);