const bcrypt = require('bcrypt')

module.exports = {
    hash: password => {
       
        const salt = bcrypt.genSaltSync(Number(process.env.SALT))
        const hashPassword = bcrypt.hashSync(password, salt)
        return hashPassword
    },

    comparePassword: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword)
    }
}