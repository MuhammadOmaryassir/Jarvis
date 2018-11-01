const Users = require('../models/Users')
const _ = require('lodash')


class UserController {
  post(req,res){
    let body = _.pick(req.body, ['email', 'password','device_password','device_name','device_port','device_url'])
    let user = new Users(body)
    user
      .save()
      .then(() => {
        res.send(user)
      })
      .catch((e) => {
        res.status(400).send(e) 
      })
  }
}
let controller = new UserController()
module.exports = {
  post: controller.post
  // login:controller.login
}