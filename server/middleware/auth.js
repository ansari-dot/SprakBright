import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async(req, res, next) => {
    try {
        // Check for token in cookies first, then Authorization header
        let token = req.cookies.token;
        
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); // Remove 'Bearer ' prefix
            }
        }

        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "climate-guardian-secret");
        
        // Get user details including role
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        req.user = { 
            id: user._id, 
            role: user.role,
            email: user.email,
            username: user.username
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
