const Projects = require('../models/Projects');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getProjects: async (req, res) =>{
        try {
            if (req.user){
                const projects = await Projects.find(
                    {collaborators : req.user._id},
                )
                return res.send({projects : projects})
            }
            else{
                return res.send({error : 'error'})
            }

        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    createProject: async (req, res) =>{
        try {
            if (req.user){
                const {description, author, color, projectName} = req.body;
                const issue_id = new ObjectId();

                // create new project and assign issue
                const project = await Projects.create({
                    projectName : projectName,
                    author : author,
                    collaborators : [ObjectId(req.user._id)],
                    description : description,
                    issues : [{
                        id : issue_id.toString(),
                        projectName : projectName,
                        description : description,
                        color : color,
                        author : author,
                        reviewer : 'None',
                        comments : 'None',
                        status : 'Created',
                        createdAt : Date.now(),
                    }],
                })


                console.log('new project')
                return res.send({project : project})
            }
            else{
                return res.send({error : 'error'})
            }

        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    updateProject: async (req, res) =>{
        try {
            if (req.user){
                const {author, name, description, color, projectName, project_id, new_issue, new_collaborator, action, issue_identifier} = req.body;
                console.log(issue_identifier)
                console.log(project_id)
                
                if (new_issue){
                    if(action == "ADD"){
                            // add new issue
                        const issue_id = new ObjectId();
                        const issue_update = await Projects.updateOne(
                        {_id : ObjectId(project_id),},
                        {$push:{issues : {
                            id : issue_id.toString(),
                            title: name,
                            projectName : projectName,
                            description : description,
                            color : color,
                            author : author,
                            reviewer : 'None',
                            comments : 'None',
                            status : 'Created',
                            createdAt : Date.now(),
                        }}}
                        )
                        console.log(issue_update);
                    }   
                }
                else if (issue_identifier){
                        // delete issue
                        console.log('deleting issue')
                        const issue_update = await Projects.updateOne(
                            {_id : ObjectId(project_id),},
                            {$pull:{issues : {id : issue_identifier}}}
                            )
                            console.log(issue_update);
                    }
                    
                
                else if (new_collaborator){
                    
                    if(action == "ADD"){
                        // add new collaborator
                        const collaborator_update = await Projects.updateOne(
                            {_id : ObjectId(project_id),},
                            {$addToSet:{collaborators : ObjectId(new_collaborator)}}
                            )
                            console.log(collaborator_update);
                    }
                    else{
                        // remove collaborator
                        const collaborator_remove = await Projects.updateOne(
                            {_id : ObjectId(project_id),},
                            {$pull:{collaborators : new_collaborator}}
                            )
                            console.log(collaborator_remove);
                    }

                }

                return res.send({user : "updated"})
            }
            else{
                return res.send({error : 'error'})
            }

        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
    deleteProject: async (req, res) =>{
        try {
            if (req.user){
                const projects = await Projects.remove(
                    {_id : req.body.id},
                )
                console.log(projects)
                return res.send({projects : 'deleted'})
            }
            else{
                return res.send({error : 'error'})
            }

        } catch (error) {
            console.log('failed')
            console.log(error)
        }
    },
}