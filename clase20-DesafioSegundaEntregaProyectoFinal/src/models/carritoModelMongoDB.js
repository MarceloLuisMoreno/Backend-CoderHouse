import mongoose from "mongoose";

const carritosCollection = 'carritos';

const CarritoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    productos: [{
        id: {
            type: Number,
            required: true
        },
        timestamp: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        codigo: {
            type: Number,
            required: true,
        },
        foto: {
            type: String,
            required: true,
        },
        precio: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        }
    }]
})

export const carritos = mongoose.model(carritosCollection, CarritoSchema);
