const express = require('express')
const asyncHandler = require('express-async-handler')
const check = require('express-validator')
const db = require('../../db/models')

const { Articles } = require('../../db/models')
const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
        const articles = await Articles.findAll()
        return res.json(articles)
    })
);

// router.post('/new', asyncHandler (async (req, res ) => {
//     const { userId } = req.session.auth;
//     const { title, body, coverPhoto } = req.body;

//     const newArticle = await db.Articles.build({
//         userId,
//         title,
//         body,
//         coverPhoto
//     });

//     if (newArticle) {
//         await newArticle.save();
//         res.json({ message: 'Success'})
//     } else {
//         res.json({ message: 'Bad Post'})
//     }
// }))

module.exports = router
