const Contact = require("../models/contact-model");

const contact = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response)
        res.status(200).json({ message: "send data successfully" });
    } catch (error) {
        res.status(400).json({ message: "data is not send" });
    }
}
module.exports = contact;