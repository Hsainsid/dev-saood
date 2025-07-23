const { body } = require("express-validator");

const validateService = [
    body("serviceName")
        .optional()
        .isString()
        .withMessage("Service name must be a string"),

    body("category")
        .optional()
        .isString()
        .withMessage("Category must be a string"),

    body("status")
        .optional()
        .isIn(["Active", "Inactive"])
        .withMessage("Status must be either Active or Inactive"),
];

module.exports = validateService;
