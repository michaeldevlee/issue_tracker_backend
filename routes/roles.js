const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/role')

router.post('/getRole', rolesController.getRole)
router.post('/createRole', rolesController.createRole)
router.delete('/deleteRole', rolesController.deleteRole)

module.exports = router