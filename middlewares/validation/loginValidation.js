const { body } = require('express-validator')


module.exports = [
    body('username').not().isEmpty().withMessage('Please enter valid username'),
    body('password').not().isEmpty().withMessage('Please enter valid password')
]