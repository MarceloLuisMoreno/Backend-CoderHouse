module.exports = class Producto {
    constructor(id, {
        title,
        price,
        thumbnail,
        timestamp
    }) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.timestamp = timestamp;
        this.id = id;
    }
}