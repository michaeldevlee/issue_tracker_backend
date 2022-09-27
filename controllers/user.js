const User = require('../models/Users');

module.exports = {
    searchUsers : async (req,res)=>{
        try {
            const users = await User.find({userName : {$regex : req.body.userName}})
            res.send({users : users})
        } catch (err) {
            console.log(err)
        }
    },
    getUser : async (req,res)=>{
        try {
            const user = await User.find({userName : req.user.userName})
            console.log(user)
            res.send({user : user})
        } catch (err) {
            console.log(err)
        }
    },
    createUser : async (req, res)=>{
        try {
            const {userName, password, email, role, projects, teams, issues, stats} = req.body;
            await User.create({
                userName : userName,
                password : password,
                email : email,
                role : 'member',
                projects : null,
                teams : null,
                issues : null,
                stats: null,
            })
            console.log(`user has been created!}`);
            res.send({message : req.body})
        } catch (err) {
            console.log(err);
        }
    },
    deleteUser :async (req, res) => {
        try {
            await User.deleteOne({name : 'Michael'})
            console.log('user has been deleted');
            res.send({message : 'user has been deleted'})
        } catch (error) {
            console.log(error)
        }
    },
}