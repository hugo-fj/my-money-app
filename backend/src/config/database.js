const mongoose= require ('mongoose')

//evitando msgs no console
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/mymoney',  
    {   useNewUrlParser: true ,
        useFindAndModify: false
    }).then(()=>{
        console.log("Conexão com Banco de Dados Realizada.")
    }).catch((erro)=>{
        console.log("Houve um Erro com a Conexão do Banco de Dados"+erro)
    })
    

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório." 
mongoose.Error.messages.Number.min = "O valor '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."  
mongoose.Error.messages.Number.max = "O valor '{VALUE}' informado é maior que o limite maximo de '{MAX}'." 
mongoose.Error.messages.String.enum = "O valor  '{VALUE}' não é válido para o atributo '{PATH}'."
  