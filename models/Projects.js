const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        unique: true,
    },
    author:{
        type: String,
    },
    reviewers:{
        type : Array,
    },
    collaborators:{
        type:Array,
    },
    description : {
        type: String,
    },
    issues:{
      type : Array,
    }, 
})

module.exports = mongoose.model('Project', ProjectSchema);