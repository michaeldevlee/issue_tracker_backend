const Roles = require('../models/Roles');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getRoles: async (req, res) =>{
        try {
            console.log('getting roles')
            if (req.user){
                
                const role = await Roles.find(
                    {userId : req.user._id},
                )
                console.log(role)
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
                const role = await Roles.create(
                    {
                        userId : req.user._id,
                        projectId : req.body.projectId,
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
                        userId : req.user._id,
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