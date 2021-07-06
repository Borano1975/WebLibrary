const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate (value) {
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid.')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


adminSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, 'tokentokentoken')
    
    this.tokens = this.tokens.concat({token})
    await this.save()

    return token
}

adminSchema.methods.toJSON = function () {
    const adminObject = this.toObject()
    delete adminObject.tokens
    delete adminObject.password

    return adminObject
}

//used for loging admin in:
adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({email})
    if (!admin){
        throw new Error('Please try again.')
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
        throw new Error('Please try again.')
    }

    return admin
}

//hashing passwords before saving
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 6)
    }
    next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin