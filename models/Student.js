const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    }
})

studentSchema.pre("save", async function (next) {
    const user = this;
    console.log(this)
    if (!this.isModified("password")) {
        next()
    }
    try {
        const hashpassword = await bcrypt.hash(user.password, 10)
        user.password = hashpassword
    } catch (error) {
        next(error)
    }
});


studentSchema.methods.tokens = async function () {
    try {
        return jwt.sign({
            user_id: this._id.toString(),
            email: this.email,
            admin: this.admin
        },
            process.env.JWT_STRING
            , {
                "expiresIn": "30d"
            }
        )
    } catch (error) {
        console.log(error)
    }
}

studentSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}



const Student = new mongoose.model("Student", studentSchema)

module.exports = Student