const cicloPagamento = require('./cicloPagamento')
const errorHandler = require('../common/errorHandler')

cicloPagamento.methods(['get','post','put','delete'])

//sempre retorne o valor alterado/atualizado e executar as validações
cicloPagamento.updateOptions({new:true, runValidators:true})

// pegando os momentos depois do post e put para passar o middleware msg 
//aplicação middleware error
cicloPagamento.after('post',errorHandler).after('put',errorHandler)

  

// rota para quantidade de registro
cicloPagamento.route('count', (req, res) => {
    cicloPagamento.count((error,value)=>{
        if(error){
            res.status(500).json({erros:[error]})  
        }else{
            res.json({value})  
        }
    }) 
})


//rota/serviço para retornar todo o sumario
cicloPagamento.route('summary', (req, res) => {
    cicloPagamento.aggregate([{        
         $project: {
            credito: {
                $sum: "$creditos.value"
            },
            debito: {
                $sum: "$debitos.value"
            }
        }
    }, 
    //--AGRUPANDO todos os argumentos em um unico registro
        //o credito após o null não é o mesmo credito depois do $project(nova variavel)
        //mas o "$credito" faz referencia ao resultado do  credito depois do $project
    {
        $group: {
            _id: null,
            credito: {
                $sum: "$credito"
            },
            debito: {
                $sum: "$debito"
            }
        }
    }, 
     //retirar o id mull e apresentar derdito e debito(0 = false 1 = true)
    {
        $project: {
            _id: 0,
            credito: 1,
            debito: 1
        }
    }]).exec((error, result) => {
        if (error) {
            res.status(500).json({ 
                errors: [error]
            })
        } else {
            res.json(result[0] || {
                credito: 0,
                debito: 0
            })
        }
    })
})




       
module.exports  = cicloPagamento