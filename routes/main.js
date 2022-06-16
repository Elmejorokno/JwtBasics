const express = require('express')
const { dashboard, authFake } = require('../controllers/mainController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/dashboard', authMiddleware, dashboard)
router.post('/auth', authFake)

module.exports = router
