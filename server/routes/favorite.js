const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {

    Favorite.find({"movieId":req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, FavoriteNumber: info.length})
    })
})

router.post('/favorited', (req, res) => {
    //list정보 db에서 가져오는 문
    Favorite.find({"movieId":req.body.movieId, "userfrom":req.body.userfrom})
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(info.length !== 0 ){
            result = true
        }
        res.status(200).json({success: true, favorited: result})
    })
})

router.post('/removeFromFavorite', (req, res) => {
    //좋아요 삭제
    Favorite.findOneAndDelete({"movieId":req.body.movieId, "userfrom":req.body.userfrom})
    .exec((err, doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    })
})

router.post('/addFromFavorite', (req, res) => {
    //좋아요 추가
    const favorite = new Favorite(req.body)

    favorite.save((err,doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    })
})

router.post('/getFavoretMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })
})

module.exports = router;