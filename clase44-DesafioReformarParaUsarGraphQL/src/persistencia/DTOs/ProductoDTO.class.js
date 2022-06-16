class ProductoDTO {
    constructor(id, title, thumbnail, price) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.price = price
    }

    getid() {
        return this.id;
    }

    setid(id) {
        return this.id = id;
    }

    gettitle() {
        return this.title;
    }

    settitle(title) {
        return this.title = title;
    }

    getthumbnail() {
        return this.thumbnail;
    }

    setthumbnail(thumbnail) {
        return this.thumbnail = thumbnail;
    }

    getprice() {
        return this.price;
    }

    setprice(price) {
        return this.price = price;
    }

}

module.exports = ProductoDTO