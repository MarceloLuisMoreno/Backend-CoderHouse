const config = require('../../../config.js')
const admin = require('firebase-admin')

const serviceAccount = require('../../../DB/basefirebase-17f9c-firebase-adminsdk-e24we-18a617e251.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:config.databaseURL
})

console.log("Firebase up")


const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

const db = admin.firestore()
const query = db.collection('productos')

console.log('pase por firebase')
const productsDAO = new ContenedorFirebase(db, query)

module.exports = productsDAO
