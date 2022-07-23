const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const jwt_SECRET = "abdul@123"
let success=false
// Route 1: Create a User using: POST "/api/auth/createuser". login not required
router.post('/createuser',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 3 }),
    body('name', 'Enter a vaild Name').isLength({ min: 3 }),
  ],
  async (req, res) => {
    // if ther are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the email exists already
    try {


      
      let user = await User.findOne({ email: req.body.email });
      console.log(user)
      if (user) {
        return res.status(400).json({success:success, error: "Sorry a user with this email already exists" })
      }

      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })

      // JWt session management
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, jwt_SECRET);

      // here we using ES6 so that {authtoken:authtoken} not required to wirte
      success=true
      res.json({ success,authtoken })
      
      // .then(user => res.json(user))
      //   .catch(err=> {console.log(err)
      //   res.json({error:'Please enter a unique value for email'})})
      // now we are using async so that .then not required

      // For mine understanding
      // res.json({"User":"user created successfully"})

    } catch (error) {
      console.error(error.message);
      res.status(500).send(success,"some error occured")
    }
  })


//Route 2: Create a User using: POST "/api/auth/login". login not required
router.post('/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be empty').exists()
  ],
  async (req, res) => {
    // if ther are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Please try to login with correct credentials" })
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Please try to login with correct credentials" })
      }

      //payload sending
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, jwt_SECRET);

      // here we using ES6 so that {authtoken:authtoken} not required to wirte
      success=true
      res.json({success, authtoken })

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured")
    }

  })


  // Route 3:  Get loggedin User details using: POST "/api/auth/getuser". login required
router.post('/getuser',fetchuser, async (req, res) => {
try {

  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured")
}
})
module.exports = router