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
}))

router.delete('/:id', asyncHandler (async (req, res) => {
    const article = await Articles.findByPk(req.params.id);
    if (!article) throw new Error('Cannot find item');

    await Articles.destroy({ where: {id: article.id }});
    return res.json({ id: article.id })
}));

router.patch('/:id', validateArticles, asyncHandler (async (req, res) => {
    let article = await Articles.findByPk(req.params.id);

    const { title, body, coverPhoto } = req.body;

    article.title = title;
    article.body = body;
    article.coverPhoto = coverPhoto;

    await article.save()

    return res.json(article)
}))

module.exports = router
