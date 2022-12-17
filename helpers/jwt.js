const jwt = require('jsonwebtoken')

module.exports = {
    signAccessToken: (payload) => {
        const token = jwt.sign(payload, process.env.KEY_TOKEN)

        return token
    },

    verifyToken:  (token, cb) => {
        jwt.verify(token, process.env.KEY_TOKEN, (err, decoded) => {
            if(err){
                return cb(err)
            } else {
                return cb(null, decoded)
            }
        })
        
    }
}