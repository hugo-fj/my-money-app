 const express = require('express')

// recebendo servidor express e passando paramentros para um modulo
 module.exports = function(server){

    // Definir URL base para todas as rotas
    const router = express.Router()
    server.use('/api', router)

    //Rotas do ciclo de pagamento
    const CicloPagamento = require('../api/cicloPagamento/cicloPagamentoService')
    CicloPagamento.register(router,'/cicloPagamentos') 
 } 
