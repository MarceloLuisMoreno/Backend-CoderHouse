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

router.get('/info', (req, res) => {
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