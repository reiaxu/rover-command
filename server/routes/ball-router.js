const express = require('express')

const BallCtrl = require('../controllers/ball-ctrl')

const router = express.Router()

router.post('/ball', BallCtrl.createBall)
router.put('/ball/:id', BallCtrl.updateBall)
router.delete('/ball/:id', BallCtrl.deleteBall)
router.get('/ball/:id', BallCtrl.getBallById)
router.get('/balls', BallCtrl.getBalls)

module.exports = router