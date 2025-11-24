export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User with role ${req.user ? req.user.role : 'unauthenticated'} is not allowed to access this resource`,
                success: false
            });
        }
        next();
    };
};