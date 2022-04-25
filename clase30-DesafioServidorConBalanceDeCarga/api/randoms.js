// child

process.on('message', msg => {
    let cantidad = msg

    console.log('Cantidad: ', cantidad)
    let numerosAleatorios = []
    for (let i = 0; i <= cantidad; i++) {
        numeroAleatorio = Math.floor((Math.random() * (1000 - 1 + 1)) + 1)
        let busco = numerosAleatorios.findIndex(aleatorio => aleatorio.numero == numeroAleatorio)
        if (busco >= 0) {
            numerosAleatorios[busco].cantidad++
        } else {
            numerosAleatorios.push({
                numero: numeroAleatorio,
                cantidad: 1
            })
        }

    }

    const ordenados = numerosAleatorios.sort((a, b) => a.numero - b.numero)
    console.log(ordenados)

    process.send(ordenados)
    process.exit()
})

process.send('listo')