const express = require("express");
const leadRouter = require("./lead.router.js");


const router = express.Router();

router.use("/lead", leadRouter);


module.exports = router;