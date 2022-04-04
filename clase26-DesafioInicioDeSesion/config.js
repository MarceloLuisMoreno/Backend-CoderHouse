module.exports = {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/ecommerce'
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://MLmongoDB:MLmongoDB@cluster0.36hry.mongodb.net/mongoDB?retryWrites=true&w=majority'
    }
}