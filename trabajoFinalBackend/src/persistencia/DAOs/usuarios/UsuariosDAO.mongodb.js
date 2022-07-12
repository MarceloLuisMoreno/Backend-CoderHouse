/*========== Modulos globales para DAOs ==========*/
const CustomError = require("../../../Classes/CustomError.class.js")
const MongoDBClient = require("../../MongoDBClient.class.js")
const logger = require("../../../loggers/logger")
/*========== Modulos especifico para DAOs ==========*/
const UsuarioModel = require("../../models/Usuario.model.js")
const DAO = require("../DAO.class")

class UsuariosDAOMongoDB extends DAO {
    constructor() {
        super();
        if (UsuariosDAOMongoDB.instancia) return UsuariosDAOMongoDB.instancia
        this.collection = UsuarioModel;
        this.conn = new MongoDBClient();
        UsuariosDAOMongoDB.instancia = this
    }

    async listarTodos() {
        try {
            return await this.collection.find({})
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar Usuarios.', error);
            logger.error(cuserr);
        }
    }

    async listar(id) {
        try {
            let buscado = await this.collection.find({
                email: {
                    $eq: id
                }
            })
            if (buscado.length === 0) return null
            else {
                return buscado[0]
            }
        } catch (error) {
            const cuserr = new CustomError(500, `Error al listar Usuario id ${cliente}`, error);
            logger.error(cuserr);
        }
    }

    async guardar(usuario) {
        try {
            return await this.collection.create(usuario)
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar usuario.', error);
            logger.error(cuserr)
        }
    }

    async actualizarUsuario(cliente, datos) {
        try {
            await this.collection.updateOne({
                email: cliente
            }, {
                $set: {
                    productos: productos
                }
            })
            return void(0)
        } catch (error) {
            error => {
                logger.error(`Error al actualizar Usuario id: ${id}`)
                const cuserr = new CustomError(500, 'Error al actualizar Usuario. ', error);
                throw cuserr
            }
        }
    };

    async borrarUsuario(cliente) {
        try {
            return await this.collection.deleteOne({
                email: {
                    $eq: cliente
                }
            })
        } catch (error) {
            logger.error(`Error al borrar Usuario id: ${error}`)
            const cuserr = new CustomError(500, 'Error al borrar Usuario. ', error);
            throw cuserr
        }
    }

    async borrarTodos() {
        try {
            return await this.collection.deleteMany({})
        } catch (error) {
            logger.error(`Error al borrar id: ${error}`)
            const cuserr = new CustomError(500, 'Error al borrar todos los Usuarios. ', error);
            throw cuserr
        }
    }

}

module.exports = UsuariosDAOMongoDB;