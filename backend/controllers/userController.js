
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public

const authUser = async(req,res) => {
    try {
        const {email, password } = req.body
        const user = await User.findOne({email})

        if (user && (await user.matchPassword(password)) ) {
          res.status(200).json({
              _id : user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: generateToken(user._id),
          })
          } else {
              res.status(401).json({
                  result : "failed due to invalid username or password"
              })
              
          }
        }
     catch (e) {
        console.log(e)
    }
}

//@desc Get user Profile
//@route POST /api/users/profile
//@access Private

const getUserProfile = async(req,res) => {
    // res.send("success");
    try {
        const user = await User.findById(req.user._id)
        console.log("userintry",user);
        if(user) {
        res.status(201).json({
              _id : user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)     
    }
     } catch (error) {
        console.log("error in catch",error)
     }
     }

//@desc Get update Profile
//@route PUT /api/users/profile
//@access Private
     
const updateUserProfile = async(req,res) => {
    // res.send("success");
    try {
        const user = await User.findById(req.user._id)
        console.log("userintry",user);
        if(user) {
         user.name = req.body.name || user.name
         user.email = req.body.email || user.email
         if(req.body.password) {
            user.password =  req.body.password
         }
         const updatedUser = await user.save()

         res.status(200).json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })

    } else {
        res.status(404)     
    }
     } catch (error) {
        console.log("error in catch",error)
     }
     }

//@desc Get user registration
//@route POST /api/users/registration
//@access Public


const registerUser = async(req,res) => {
    try {
        const {name, email, password } = req.body
        const userExists = await User.findOne({email})

        if(userExists) {
            res.status(400).json({
                result : "User already exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        })

        if(user) {
            res.status(201).json({
                _id : user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: generateToken(user._id),
            })
        } else {
            res.status(400).json('Invalid user data')
        }
        }
     catch (e) {
        console.log(e)
    }
}


export {authUser, getUserProfile, registerUser, updateUserProfile}