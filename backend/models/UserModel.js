const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Create User Schema
const userSchema = new mongoose.Schema(
    {
        name: {type: "String", required: true, unique: true},
        email: {type: "String", default: ""},
        password: {type: "String", default: ""},
        pic: {
            type: "String",
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        }
    },{
        timestamps: true,
    })

// Check for password matching
userSchema.methods.matchPassword = function (passwd) {
    return bcrypt.compare(passwd, this.password)
}

// Mongoose listener - Before event `Insertion`
// Hashing password before saving
userSchema.pre("save", async function (next) {
    // Executing only if data changed or has a defined password
    if(!this.isModified){
        next()
    }

    const salt =  await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Mongoose User Model - for ODM purposes
const User = mongoose.model('User', userSchema)

module.exports = User