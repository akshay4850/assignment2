const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
  '/signup',
  // Wrapping checks in array is not required, but makes it clearer that this block is about validation
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      // Method found in validator.js docs. validator.js implicitly installed with express-validator
      .custom((value, { req }) => {
        if (value === 'test1@test.com') {
          throw new Error('This email is forbidden');
        }
        return true;
      }),
    // Look for specific field but in request body only (unlike check, which looks in all features of incoming request [header, cookie, param, etc.]). Adding validation error message as second argument as alternative to using withMessage() after each validator, since using message for both
    body(
      'password',
      'Please use a password with a minimum of 8 alphanumeric characters.'
    )
      .isLength({ min: 8 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset-password', authController.getResetPassword);

router.post('/reset-password', authController.postResetPassword);

// token: dynamic parameter. Has to be named token here because looking for token in request params in getNewPassword controller action
router.get('/reset-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
