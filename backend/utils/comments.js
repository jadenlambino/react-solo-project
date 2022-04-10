const {check} = require('express-validator');
const {handleValidationErrors} = require('./validation');

const body =
    check('body')
    .notEmpty()
    .withMessage('Please fill out the required fields.')

exports.validateComments = [
    body,
    handleValidationErrors
]
