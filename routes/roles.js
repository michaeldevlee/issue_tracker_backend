const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/role')

router.get('/getRoles', rolesController.getRoles)
router.post('/createRole', rolesController.createRole)
router.delete('/deleteRole', rolesController.deleteRole)

module.exports = router