const Ball = require('../models/ball-model')

createBall = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a ball',
        })
    }

    const ball = new Ball(body)

    if (!ball) {
        return res.status(400).json({ success: false, error: err })
    }

    ball
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: ball._id,
                message: 'ball created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Ball not created!',
            })
        })
}

updateBall = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Ball.findOne({ _id: req.params.id }, (err, ball) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Ball not found!',
            })
        }
        ball.colour = body.colour
        ball.xcoord = body.xcoord
        ball.ycoord = body.ycoord
        ball.dist = body.dist
        ball
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: ball._id,
                    message: 'Ball updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Ball not updated!',
                })
            })
    })
}

deleteBall = async (req, res) => {
    await Ball.findOneAndDelete({ _id: req.params.id }, (err, ball) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!ball) {
            return res
                .status(404)
                .json({ success: false, error: `Ball not found` })
        }

        return res.status(200).json({ success: true, data: ball })
    }).catch(err => console.log(err))
}

getBallById = async (req, res) => {
    await Ball.findOne({ _id: req.params.id }, (err, ball) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!ball) {
            return res
                .status(404)
                .json({ success: false, error: `Ball not found` })
        }
        return res.status(200).json({ success: true, data: ball })
    }).catch(err => console.log(err))
}

getBalls = async (req, res) => {
    await Ball.find({}, (err, balls) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!balls.colour) {
            return res
                .status(404)
                .json({ success: false, error: `Ball not found` })
        }
        return res.status(200).json({ success: true, data: balls })
    }).catch(err => console.log(err))
}

module.exports = {
    createBall,
    updateBall,
    deleteBall,
    getBalls,
    getBallById,
}