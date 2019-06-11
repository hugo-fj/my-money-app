const restful = require('node-restful')
const mongoose = restful.mongoose

const creditoSchema = new mongoose.Schema({
      name:{type:String, required:true},
      value:{type:Number,min:0, required:true}
})

//const teste =['PAGO','PENDENTE','AGENDADO']
const debitoSchema = new mongoose.Schema({
    name:{type: String, required: true},
    value:{type: Number, min:0, required:[true,'Informe o valor do débito']},
    status:{type:String, required:[true,'Informe o status'], uppercase: true, 
        enum:['PAGO','PENDENTE','AGENDADO']}
})

const cicloPagamentoSchema = new mongoose.Schema({
    name:{type: String, required: true},
    month:{type:Number,min:1, max:12,required:true},
    year:{type:Number,min:1970, max:2100,required:true},
    creditos:[creditoSchema],
    debitos:[debitoSchema]
})
module.exports = restful.model('CicloPagamento',cicloPagamentoSchema)  
