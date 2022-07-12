const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const JWT_PRIVATE_KEY = config.jwt_privateKey;

module.exports = async function generateToken(user) {
  try {
    const token = jwt.sign({
      data: user
    }, JWT_PRIVATE_KEY, {});
    return token;
  } catch (error) {
    console.log(`Error al generar jwt: ${error}`);
  }
}