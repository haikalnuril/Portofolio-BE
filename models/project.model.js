import mongoose from "mongoose";

const {Schema} = mongoose;

const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field cannot be empty'],
        unique: [true, 'Title already exists'],
    },
    type:{
        type: String,
        required: [true, 'Type field cannot be empty'],
        enum: ['Team', 'Personal']
    },
    as : {
        type: String,
        required: [true, 'As field cannot be empty'],
        enum: ['Frontend', 'Backend', 'Fullstack']
    },
    teckstack:{
        type: String,
        required: [true, 'Teckstack field cannot be empty'],
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

const Project = mongoose.model('Project', projectSchema);

export default Project;