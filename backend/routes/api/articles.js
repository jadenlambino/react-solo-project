const express = require('express')
const asyncHandler = require('express-async-handler')
const check = require('express-validator')
const db = require('../../db/models')

const { Articles } = require('../../db/models')
const { validateArticles } = require('../../utils/articles')
const router = express.Router()


router.get('/', asyncHandler(async (req, res) => {
        const articles = await Articles.findAll()
        return res.json(articles)
    })
);

router.post('/', validateArticles, asyncHandler (async (req, res ) => {
    //const { userId } = req.session.auth;
    const { userId ,title, body, coverPhoto } = req.body;

    const newArticle = await db.Articles.create({
        userId,
        title,
        body,
        coverPhoto
    });

    res.json(newArticle)

    // if (newArticle) {
    //     await newArticle.save();
    //     res.json({ message: 'Success'})
    // } else {
    //     const err = new Error('Unsuccessful Attempt');
    //     err.status = 400;
    //     err.title = 'Failed Post'
    //     err.errors = ['']
    //     res.json({ message: 'Bad Post'})
    // }
}))

module.exports = router
