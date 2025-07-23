const { body } = require("express-validator");

const appointmentValidation = [
  // Validate patients array
  body("patients")
    .isArray({ min: 1 })
    .withMessage("At least one patient is required"),

  // Validate individual patient fields
  body("patients.*.name")
    .notEmpty()
    .withMessage("Patient name is required"),

  body("patients.*.gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other"),

  body("patients.*.age")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age must be a non-negative integer"),

  body("patients.*.time")
    .notEmpty()
    .withMessage("Appointment time is required"),

  // Appointment-level fields
  body("contact")
    .notEmpty()
    .withMessage("Contact number is required")
    .matches(/^[0-9\-]+$/)
    .withMessage("Contact must be a valid phone number format (e.g., 7809-564-984)"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be in a valid ISO format"),

  body("city")
    .notEmpty()
    .withMessage("City is required"),

  body("paymentStatus")
    .optional()
    .isIn(["Pending", "Done", "Failed"])
    .withMessage("Payment status must be one of: Pending, Done, Failed"),
];

module.exports = {appointmentValidation};
