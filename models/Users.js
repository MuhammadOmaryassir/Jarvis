const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  
  password: {
    type: String,
    required: true,

  },
  device_password: {
    type: String,
    required: true,
    

  },
  device_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  device_url: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  lamp1: {
    type: Boolean,
    default:false
  },
  lamp2: {
    type: Boolean,
    default:false
  },
  lamp3: {
    type: Boolean,
    default:false
  },

  device_port: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
})

// authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error('User not found.')
        err.status = 401
        return callback(err)
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user)
        } else {
          return callback()
        }
      })
    })
}

// hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  let user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})
const User = mongoose.model('User', UserSchema)
module.exports = User
