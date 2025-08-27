import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split("Bearer ")[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //attatch user to request
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch(error) {
            console.log(error);
            return res.status(401).json({ message: "Not Authorized, token failed" })
        }
    }

    if(!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default protect;