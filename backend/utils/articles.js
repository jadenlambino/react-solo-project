const {check} = require('express-validator')
const handleValidationErrors = require('./validation')

const title =
    check('title')
    .notEmpty()
    .withMessage('You must have a title!')

const body =
    check('body')
    .notEmpty()
    .withMessage('Please share your story!')

const coverPhoto =
    check('coverPhoto')
    .isURL()
    .withMessage('Must be a valid URL.')

exports.validateArticles = [
    title,
    body,
    coverPhoto,
    handleValidationErrors
]
