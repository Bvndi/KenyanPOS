import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Not authorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token"});
    }
};

// Middleware to check for admin role
export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }
    next();
};