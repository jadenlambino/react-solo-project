const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

const { Comments } = require('../../db/models');
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const comments = await Comments.findAll()
    return res.json(comments)
}));

router.post('/', asyncHandler(async (req, res) => {
    const { userId, articleId, body } = req.body

    const newComment = await db.Comments.create({
        userId,
        articleId,
        body
    })

    res.json(newComment)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const comment = Comments.findByPk(req.params.id);
    if (!comment) throw new Error('Cannot find Item');

    await Comments.destroy({ where: {id: comment.id}})
    return res.json({id: article.id})
}))

// router.patch('/:id', asyncHandler (async (req, res) => {
//     let comments = await Comments.findAll({ where: })
// }))

module.exports = router
