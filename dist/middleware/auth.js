"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.requireAdmin = requireAdmin;
const jwt_1 = require("../utils/jwt");
function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const [, token] = authHeader.split(' ');
        const decoded = (0, jwt_1.verifyToken)(token);
        req.admin = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
function requireAdmin(req, res, next) {
    if (req.admin?.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
}
