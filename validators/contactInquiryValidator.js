const { body } = require("express-validator");

const contactInquiryValidator = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("mobile").notEmpty().withMessage("Mobile number is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("note").notEmpty().withMessage("Note is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
];

module.exports = contactInquiryValidator;
