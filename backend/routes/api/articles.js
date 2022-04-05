const express = require('express')
const asyncHandler = require('express-async-handler')
const check = require('express-validator')

const { Articles } = require('../../db/models')
const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
        const articles = await Articles.findAll()
        return res.json(articles)
    })
);

module.exports = router
