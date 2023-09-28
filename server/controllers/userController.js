// const Login = require('../loginModel');

// const loginController = {};


// loginController.addUser = async (req, res, next) => {
//   const { body } = req;
//   try {

//     const login = await Login.create(body);
//     res.locals.loginId = login;
//     return next();

//   } catch (err) {

//     return next({
//       message: {
//         err: err,
//         log: 'ERROR: userController.createUser'
//       }
//     })

//   }
// };

// loginController.verifyUser = async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const result = await Login.findOne({ username: username });
//     res.locals.userId = result._id;

//     result.comparePassword(password, function (err, isMatch) {

//       if (!isMatch) {
//         res.locals.user = 'false';
//         return next();
//       }
//       res.locals.user = 'true'
//       return next();
//     });


//   } catch (err) {
//     return next({
//       message: 'ERROR: userController.comparepassword'
//     })
//   }

// };


const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
}

exports.registerUser = async (req, res, next) => {

  try {
    const { name, email, password } = req.body;

    // Check if all fields are filled
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create account
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.loginUser = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid Credenitials')
    }
  } catch (error) {
    next(error);
  }
}

exports.getUser = async (req, res, next) => {

  try {
    const user = await User.findById(req.user.id).select('-password')

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    })

  } catch (error) {
    next(error);
  }
}
