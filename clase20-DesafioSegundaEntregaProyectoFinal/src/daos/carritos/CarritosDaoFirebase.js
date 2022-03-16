const config = require('../../../config.js')
const admin = require('firebase-admin')

const serviceAccount = require('../../../DB/basefirebase-17f9c-firebase-adminsdk-e24we-18a617e251.json')
/* 
*/

const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

const db = admin.firestore()
const query = db.collection('carritos')
const carritoDAO = new ContenedorFirebase(db, query)

module.exports = carritoDAO
