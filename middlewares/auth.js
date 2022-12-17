const UserModel = require('../models/user');
const { verifyToken } = require('../helpers/jwt');
module.exports = {
    authentication: async (req, res, next) => {
        try {
            if(!req.headers['authorization']) {
                // next ({message: `You don't have access this data, you need token`, status: 'Unauthorize'})
                next ({message: `You need token`, status: 'Unauthorize'})
            } else {
                const token = req.headers['authorization'].split(' ')[1]
                verifyToken(token, async (err, decoded) => {

                    if(err) return next({ message: 'invalid token', status: 'Forbidden'})
                    
                    const user = await UserModel.findById(decoded.id)
                    
                    if(!user) {
                        next({message: `User not found`, status: 'Unauthorize'})
                    } else {
                        req.userHasLogin = {
                            id: user._id,
                            adminAccess: user.adminAccess, 
                            username: user.username,
                        }
                        next()

                    }
                })
                // if(!decoded) next ({ code: 409, status: 'Conflict', message: 'invalid token'})
            }   
        } catch (err) {
            next(err)
        }     
    },

    authorization: async (req, res, next) => {
        try {

            if(!req.userHasLogin) {

               throw ({ message: `You haven't login yet`, status: 'Unauthorize'})
            }  else {
                const user = await UserModel.findById(req.userHasLogin.id).exec()

                if(!user) {
                    throw ({ message: `You haven't registered in system`, status: 'Forbidden'})
                } else if(String(user._id) === String(req.userHasLogin.id)) {
                   const userRole = req.userHasLogin.adminAccess === false
               
                if(!userRole) throw ({ message: `Role undefined `, status: 'Unauthorize'})

                   next()
                   
                } else if(!String(user._id) === String(req.userHasLogin.id)) {

                    throw ({ message: `confliting id, don't have access this data`, status: 'Conflict' })
                } 
                else {

                    throw ({ message: `You don't have access this data `, status: 'Unauthorize'})
                }
            } 
        } catch (err) {
            return next(err)
        }
    },
    authAdmin: async (req, res, next) => {
        try {
            if(!req.userHasLogin) {
               return next ({ message: `You haven't login yet`, status: 'Unauthorize'})
            }  else {
               const admin = req.userHasLogin.adminAccess === true

            if(!admin) return next ({ message: `You are not  admin`, status: 'Unauthorize'})

               next()

            } 

        } catch (err) {
            
            // log.error(err.message)
            // res.status(err.code).json(err)
            return next(err)
        }
    },
}

