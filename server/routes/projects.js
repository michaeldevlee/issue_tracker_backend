const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')

router.get('/getProjects', projectController.getProjects)
router.post('/createProject', projectController.createProject)
router.put('/updateProject', projectController.updateProject)
router.delete('/deleteProject', projectController.deleteProject)

module.exports = router