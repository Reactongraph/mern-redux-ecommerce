import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = async (req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded);

            req.user = await User.findById(decoded.id).select('-password')

            // next()
        } catch(error) {
            console.log(error)
            res.json(401)
        }
    }
    if(!token) {
        res.status(401)
        console.log('Not authorized')
    }

    next()

}

export { protect }