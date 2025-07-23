const { body } = require("express-validator");

const blockedDateValidator = [
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601().toDate(),
    body('isBlocked')
        .optional()
        .isBoolean()
        .withMessage('isBlocked must be a boolean'),
];

module.exports = blockedDateValidator;
