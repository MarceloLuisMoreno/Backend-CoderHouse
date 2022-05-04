const express = require("express")
const router = express.Router()
const path = require("path")
const auth = require('../../authentication/authentic')
const {
   fork
} = require('child_process')

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const compression = require('compression')

const logger = require('../../loggers/logger')

router.get('/info', (req, res) => {
   logger.info(`Ruta: /info, Método: get.`)
   res.render('info', {
      argumentos: process.argv,
      directorio: process.cwd(),
      idProceso: process.pid,
      versionNode: process.version,
      sistemaOperativo: process.platform,
      memoria: process.memoryUsage().heapTotal,
      path: process.execPath,
      procesadores: numCPUs
   })
})

router.get('/info-log', (req, res) => {
   logger.info(`Ruta: /info-log, Método: get.`)
   const info = {
      argumentos: process.argv,
      directorio: process.cwd(),
      idProceso: process.pid,
      versionNode: process.version,
      sistemaOperativo: process.platform,
      memoria: process.memoryUsage().heapTotal,
      path: process.execPath,
      procesadores: numCPUs   
   }
   console.log(info)

   res.render('info', {
      argumentos: process.argv,
      directorio: process.cwd(),
      idProceso: process.pid,
      versionNode: process.version,
      sistemaOperativo: process.platform,
      memoria: process.memoryUsage().heapTotal,
      path: process.execPath,
      procesadores: numCPUs
   })
})



router.get('/infozip', compression(), (req, res) => {
   logger.info(`Ruta: /infozip, Método: get.`)
   res.render('info', {
      argumentos: process.argv,
      directorio: process.cwd(),
      idProceso: process.pid,
      versionNode: process.version,
      sistemaOperativo: process.platform,
      memoria: process.memoryUsage().heapTotal,
      path: process.execPath,
      procesadores: numCPUs
   })
})

router.get('/api/randoms', (req, res) => {
   logger.info(`Ruta: /api/randoms, Método: get.`)

   let cant = req.query.cant
   if (!cant) cant = 100000000

   //proceso fork

   //Desactivo el child process para Desafío LOGGERS, GZIP Y ANALISIS DE PERFORMANCE
   //*******************************************************************************

   /* const forked = fork(path.join(path.dirname(''), '/api/randoms.js'))
   forked.on('message', msg => {
      if (msg == 'listo') {
         forked.send(cant)
      } else {
         res.send(msg)
      }
   }) */

})


module.exports = router;