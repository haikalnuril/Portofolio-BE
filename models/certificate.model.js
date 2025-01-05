import mongoose from "mongoose";
const {Schema} = mongoose;

const certificateSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field cannot be empty'],
        unique: [true, 'Name already exists'],
    },
    publisher: {
        type: String,
        required: [true, 'Publisher field cannot be empty'],
    },
    year: {
        type: Number,
        required: [true, 'Year field cannot be empty'],
    },
    description: {
        type: String,
        required: [true, 'Description field cannot be empty'],
    },
    image: {
        type: String,
        default: null
    },
    url: {
        type: String,
        required: [true, 'URL field cannot be empty'],
    }
}, {
    timestamps: true,
})

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
