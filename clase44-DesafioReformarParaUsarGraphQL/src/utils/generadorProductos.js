const {
    faker
} = require('@faker-js/faker')


module.exports = function generarData(id) {
    return {
        id: id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(100, 100, faker.commerce.productAdjective()),
    }
}