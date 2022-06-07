const URL = 'http://localhost:8080'
const request = require('supertest')(URL)
const expect = require('chai').expect


const id = '1'; //* id de producto como parametro debe ser reemplazado segun figure en mongodb Atlas
const url = '/api/productos';
const urlIncorrecta = '/api/produc'
const urlId = `/api/productos/${id}`
const urlIdInexistente = `/api/productos/50`
const producto1 = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1
}

const newProducto = {
    title: 'Pizarra para Niños.',
    price: 15900,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png'
}

const producto = {
    id: 8,
    title: 'Pizarra para Niños.',
    price: 15900,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png'
}


describe("Test API REST", () => {

    before(function () {
        console.log('********* Comienzo de Test de API RESTful MLM *********')
    })

    after(function () {
        console.log('*************        Fin  de  Test        *************')
    })

    beforeEach(function () {
        console.log('---- Comienzo Test ----')
    })

    afterEach(function () {
        console.log('----   Fin  Test   ----')
        console.log('')
    })
    describe(` 1- test ${URL}${urlIncorrecta} GET Ruta inexistente`, () => {
        it('Debe retornar un status 404, por ruta inexistente.', async () => {
            let response = await request.get(urlIncorrecta);
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(404);
        })
    })

    describe(` 2- test ${URL}${url} GET`, () => {
        it(`debería retornar un status 200`, async () => {
            let response = await request.get(url);
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(200);
        })
    })

    describe(` 3- test ${URL}${urlId} GET /:id`, () => {
        it('debería retornar un status 200', async () => {
            let response = await request.get(urlId);
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(200);
            const producto = response.body
            expect(producto).to.include.keys('title', 'price', 'thumbnail', 'id')
            expect(producto.id).to.eql(producto1.id)
            expect(producto.title).to.eql(producto1.title)
            expect(producto.price).to.eql(producto1.price)
            expect(producto.thumbnail).to.eql(producto1.thumbnail)
        })
    })

    describe(` 4- test ${URL}${urlIdInexistente} GET /:id no existe`, () => {
        it('debería retornar un status 400', async () => {
            let response = await request.get(urlIdInexistente);
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(400);
        })
    })


    describe(` 5- test ${url} POST`, () => {
        it('debe incorporar un producto', async () => {
            let response = await request.post(url).send(newProducto);
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(200);
            const id = response.body
            expect(id).to.eql(9)
        })
    })

    describe(` 6- test ${url} POST`, () => {
        it('No debe incorporar un producto vacío.', async () => {
            let response = await request.post(url).send({});
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(400);
        })
    })

    describe(` 7- test ${url} POST`, () => {
        it('No debe incorporar un precio menor a cero.', async () => {
            let response = await request.post(url).send({
                title: 'Pizarra para Niños.',
                price: -15,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png'
            });
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(400);
        })
    })

    describe(` 8- test ${url} POST`, () => {
        it('No debe incorporar un precio como string.', async () => {
            let response = await request.post(url).send({
                title: 'Pizarra para Niños.',
                price: '1500',
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png'
            });
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(400);
        })
    })

    describe(` 9- test ${url} POST`, () => {
        it('No debe incorporar un campo vacío.', async () => {
            let response = await request.post(url).send({
                title: 'Pizarra para Niños.',
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png'
            });
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(400);
        })
    })

    describe(`10- test ${url}/${producto.id} update/PUT`, () => {
        it('debe modificar el producto (segun id)', async () => {
            let response = await request.put(url + `/${producto.id}`).send(producto);
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(200);
        })
    })

    describe(`11- test ${url}/${producto.id} update/PUT`, () => {
        it('No debe modificar el producto con campos con errores.', async () => {
            let response = await request.put(url + `/${producto.id}`).send({
                title: 'Pizarra para Niños.',
                price: -15,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png'
            });
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(400);
        })
    })

    describe(`12- test ${url}/50 update/PUT producto inexistente`, () => {
        it('debe modificar el producto (segun id)', async () => {
            let response = await request.put(url + `/50`).send(producto);
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(400);
        })
    })

    describe(`13-  test ${urlId} delete/DELETE`, () => {
        it('debe eliminar el producto (segun id)', async () => {
            let response = await request.delete(urlId).send();
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(200);
        })
    })

    describe(`14- test ${urlId} delete/DELETE producto inexistente`, () => {
        it('No debe eliminar el producto inexistente', async () => {
            let response = await request.delete(urlIdInexistente).send();
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(400);
        })
    })

    describe(`15- test ${url} delete/DELETE de todos los productos`, () => {
        it('No debe eliminar todos los productos. Método no implementado', async () => {
            let response = await request.delete(url).send();
            console.log('Respuesta: ', response.body)
            console.log('Response Status: ', response.status)
            expect(response.status).to.eql(404);
        })
    })

});