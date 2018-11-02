var mqtt = require('mqtt')
let User = require('./models/Users')


let x = function (message, email) {
    User.findOne({ email: email }).exec(function (err, user) {
        console.log('555')
        if (err) {
            console.log("messages");
            res.json(err)
        } else if (!user) {
            console.log("messagessss");
            let err = new Error('User not found.')
            err.status = 401
            res.json(err)
        } else {
            if (message == '1') {
                user.lamp1 = true
//                 user.save(function (err, update) {
//                     if (err) {
//                         console.log("messages");
//                         res.json(err)
//                     }

//                 })
                console.log(user.lamp1)
            }
            else if (message == '2') {
                user.lamp1 = false
//                 user.save(function (err, update) {
//                     if (err) {
//                         console.log("messages");
//                         res.json(err)
//                     }

//                 })
                console.log(user.lamp1)
            }
            else if (message == '3') {
                user.lamp2 = true
//                 user.save(function (err, update) {
//                     if (err) {
//                         console.log("messages");
//                         res.json(err)
//                     }

//                 })
                console.log(user.lamp2)
            }
            else if (message == '4') {

                user.lamp2 = false
//                 user.save(function (err, update) {
//                     if (err) {
//                         console.log("messages");
//                         res.json(err)
//                     }


//                 })
                console.log(user.lamp2)
            }
            else if (message == '5') {
                console.log('5')
                user.lamp3 = true
//                 user.save(function (err, update) {
//                     if (err) {
//                         console.log("messages");
//                         res.json(err)
//                     }

//                 })
                console.log(user.lamp3)
            }
            else if (message == '6') {
            user.lamp3 = false
//                 user.save(function (err, update) {
//                     if (err) {
//                         console.log("messages");
//                         res.json(err)
//                     }

//                 })
                console.log(user.lamp3)
            }


        }
    })
}



let send = function (url, port, username, password, messages, email) {
    var options = {
        port: port,
        host: url,
        // clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        username: username,
        password: password,
        keepalive: 60,
        reconnectPeriod: 1000,
        protocolId: 'MQIsdp',
        protocolVersion: 3,
        clean: true,
        encoding: 'utf8'
    }
    var client = mqtt.connect(url, options)
    client.on('connect', function () { // When connected
        console.log('connected')
        // subscribe to a topic
        client.subscribe('Test', function () {
            // when a message arrives, do something with it
            client.on('message', function (topic, message, packet) {
                x(message, email)
                console.log("Received '" + message + "' on '" + topic + "'");

            })
        })
        // publish a message to a topic
        client.publish('Test', messages, function () {
            console.log("Message is published")
            client.end()  // Close the connection when published
        })
    })
}


module.exports = {
    connectt: send
}
