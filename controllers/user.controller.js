const { User } = require("../models");
const { hash, comparePassword } = require("../helpers/bcrypt");
const { signAccessToken } = require('../helpers/jwt');
const { ObjectId } = require('bson');

module.exports = class UserController {
  // Create User
  static async create(req, res, next) {
    const {
      username,
      password,
      adminAccess,
    } = req.body;
    try {
      const passwordHash = hash(password)
      const payload = {
        username: username,
        password: passwordHash,
        adminAccess: adminAccess
      };

      const user = await User.create(payload);

      res.status(201).json({
        code: 201,
        message: 'create user success',
        response: user,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get ALl User
  static async fetch(_, res, next) {
    try {
      const user = await User.find({ adminAccess: false },
        {
          password: 0
        },
      );

      res.status(200).json({
        code: 200,
        response: user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getByIdAFordmin(req, res, next) {
    const { userID } = req.params
    try {
      const user = await User.findById({ _id: userID },
        {
          password: 0
        }
      );

      res.status(200).json({
        code: 200,
        response: user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getByIdForUser(req, res, next) {
    try {
      const user = await User.findById(req.userHasLogin.id, {
        password: 0
      });

      res.status(200).json({
        code: 200,
        response: user,
      });
    } catch (err) {
      next(err);
    }
  }

  // Update User
  static async update(req, res, next) {
    const { id } = req.params;
    const {
      username,
      password,
    } = req.body;
    try {
      const passwordHash = hash(password)
      const payload = {
        username: username,
        password: passwordHash,
      };

      const user = await User.findOneAndUpdate({ _id: ObjectId(id) }, payload, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        throw {
          message: "Data Not Found",
        };
      }

      res.status(200).json({
        code: 200,
        message: 'Update user success',
        response: user,
      });
    } catch (err) {
      next(err);
    }
  }

  // Delete User
  static async destroy(req, res, next) {
    const { idUser } = req.params;
    try {
      const user = await User.findOneAndDelete({ _id: ObjectId(idUser) });

      if (!user) {
        throw {
          message: "Data Not Found",
        };
      }

      res.status(200).json({
        code: 200,
        message: 'success delete user',
        response: user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async signIn(req, res, next) {
    const { username, password } = req.body
    try {
      const user = await User.findOne({ username: username })
      if (!user) throw ({ message: 'you are not registered in the system', status: 'Forbidden' })
      if (!comparePassword(password, user.password)) {
        throw ({ message: 'username or password invalid', status: 'Forbidden' })
      } else {
        const token = signAccessToken({
          id: user._id
        })

        res.status(200).json({
          code: 200,
          message: 'Login Success',
          response: {
            username: username,
            adminAccess: user.adminAccess,
            token
          }
        })
      }
    } catch (err) {
      return next(err)
    }
  }

};
