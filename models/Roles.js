const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    project_id:{
        type: String,
    },
    role:{
        type : String,
    }

})


module.exports = mongoose.model('Role', RolesSchema);