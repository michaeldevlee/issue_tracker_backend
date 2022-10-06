const Roles = require('../models/Roles');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getRole: async (req, res) =>{
        try {
            if (req.user){
                
                const role = await Roles.find(
                    {project_id : req.body.project_id},
                )
                return res.send({role : role})
            }
            else{
                return res.send({error : 'error'})
            }

        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    createRole : async (req, res) => {
        try {
            if (req.user){
                console.log(req.body)
                console.log('body')
                const role = await Roles.create(
                    {
                        userId : req.user._id,
                        project_id : req.body.project_id,
                        role : req.body.role,
                    },
                )
                console.log(role)
                return res.send({role : role})
            }
        } catch (error) {
            console.log(error)
        }
    },
    deleteRole : async (req, res) => {
        try {
            console.log('deleting role')
            console.log(req.user._id)
            if (req.user){
                const role = await Roles.remove(
                    {
                        project_id : req.body.project_id,
                    },
                )
                console.log(role)
                return res.send({role : role})
            }
        } catch (error) {
            console.log(error)
        }
    }

}