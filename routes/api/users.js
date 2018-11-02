const express = require('express')
const UserRouter = express.Router()
const UserController = require('../../Controllers/UserController')
let User = require('../../models/Users')
UserRouter.route('/register')
let mq = require('../../connect')
const _ = require('lodash')

class Router {
  routes() {
    UserRouter.route('/register')
      .post(UserController.post)

    UserRouter.post('/login', function (req, res, next) {
      if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
          if (error || !user) {
            let err = new Error('Wrong email or password.')
            err.status = 401
            return next(err)
          } else {
            res.json({ "email": user.email, "status": "201" })
          }
        })
      } else {
        let err = new Error('All fields required.')
        err.status = 400
        return next(err)
      }
    })

    UserRouter.post('/status', function (req, res) {
      let email = req.body.email
      User.findOne({ email: email })
        .exec(function (err, user) {
          if (err) {
            res.json(err)
          } else if (!user) {
            let err = new Error('User not found.')
            err.status = 401
          } else {
            res.json({ "room1": user.lamp1, "room2": user.lamp2, "room3": user.lamp3 })
          }
        })
    })
    UserRouter.post('/send', function (req, res) {
      let body = _.pick(req.body, ['email', 'message'])
      let email = body.email
      console.log(email)
      console.log(body.message)
      User.findOne({ email: email })
        .exec(function (err, user) {
          if (err) {
            res.json(err)

          } else if (!user) {
            let err = new Error('User not found.')
            err.status = 401
            res.json(err)
          } else {
            try {

              mq.connectt(user.device_url, parseInt(user.device_port), user.device_name, user.device_password, body.message, body.email)
            } catch (err) { res.send(302,"this mail has worng Data cant connect to your smart home") }
            res.json(user)
          }

        }

        )
    }
    )
  }
}


let route = new Router()
route.routes()
module.exports = UserRouter