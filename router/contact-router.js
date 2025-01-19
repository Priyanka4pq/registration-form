const express = require("express")
const contact = require("../controllers/contact-controller")
const contact1 = express.Router()


contact1.route("/contact").post(contact);

module.exports = contact1;