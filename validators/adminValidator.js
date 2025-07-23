const { body } = require("express-validator");

 const registerValidator = [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("accessRole")
        .optional()
        .isIn(["Admin", "Editor", "Viewer"])
        .withMessage("Invalid access role"),
];

 const loginValidator = [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
];

 const forgotPasswordValidator = [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
];

 const verifyOtpValidator = [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
    body("otp")
        .isLength({ min: 6, max: 6 })
        .withMessage("OTP must be 6 digits")
        .isNumeric()
        .withMessage("OTP must be numeric"),
];

 const resetPasswordValidator = [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
    body("newPassword")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error("Confirm password does not match new password");
        }
        return true;
    }),
];

module.exports = {
    registerValidator,
    loginValidator,
    forgotPasswordValidator,
    verifyOtpValidator,
    resetPasswordValidator,
};
