const { body } = require("express-validator");
const User = require('../../models/User')
module.exports = [
  body("role").custom(async (userInput) => {
    const roles = userInput == "student" || userInput == "teacher";
    
    if (!roles) {
      return Promise.reject("You have made a suspicious transaction!")
    }
  }),

  body("name")
    .not()
    .isEmpty()
    .withMessage("Name field is require.")
    .isLength({ min: 2, max: 40 })
    .withMessage("The name field can contain a minimum of 2 characters and a maximum of 40 characters."),

  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Please enter valid email.")
    .custom(async (userInput) => {
        return User.findOne({email : userInput}).then(user => {
            if(user){
                return Promise.reject("Email  is already exists!")
            }
        })
    }),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Please Enter a password...")
    .isLength({ min: 8, max: 120 })
    .withMessage("The password can contain a minimum of 8 characters and a maximum of 120 characters. "),

  body("username")
    .not()
    .isEmpty()
    .trim()
    .isAlpha("en-US", { ignore: "123456789_" })
    .withMessage("Please enter valid username..")
    .custom(async (userInput) => {
        return User.findOne({username : userInput}).then(user => {
            if(user){
                return Promise.reject("Username is already exists")
            }
        })
    }),
];

// [
//     body('name').not().isEmpty().escape().withMessage('Please enter your name.')
//     .isLength({min : 2, max : 40}).withMessage('The name field must contain a minimum of 2 characters and a maximum of 40 characters.')
// ],
