const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

router.post('/getComments', (req, res) => {
    Comment.find({ 'movieId': req.body.movieId })
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, comments })
        })
})

router.post('/addComment', (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err,doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    })
})

module.exports = router;