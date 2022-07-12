const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const JWT_PRIVATE_KEY = config.jwt_privateKey;

module.exports = async (req, res, next) => {
    console.log('autoken:   ', req.headers["authorization"])
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({
            error: 'invalid token',
        });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                error: 'Usuario not authorized',
                message: err
            });
        }
        req.user = decoded.data;
        next();
    });
};