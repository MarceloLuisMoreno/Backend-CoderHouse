class ProductoDTO {
    constructor(id, title, category, thumbnail, price) {
        this.id = id;
        this.title = title;
        this.category = category;
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

    getcategory() {
        return this.category;
    }

    setcategory(category) {
        return this.category = category;
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