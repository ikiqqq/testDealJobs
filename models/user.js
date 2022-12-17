const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
      }, // NRK
      password: {
        type: String,
        required: true,
      },
      adminAccess: {
        type: Boolean,
        default: false,
      }
    }, { strict: false })

    const UserModel = mongoose.model('users', UserSchema)
    module.exports = UserModel
