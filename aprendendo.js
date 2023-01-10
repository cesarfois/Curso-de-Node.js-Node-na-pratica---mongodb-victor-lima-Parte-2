const mongoose = require("mongoose")


mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

mongoose.connect('mongodb+srv://fois2010:Siexpre$$@cluster0.9e3ejn1.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('MongoDB conectado com sucesso')
})
.catch( (error) => {
    console.log('houve um erro ao se conectar ao mongoDB:' + error )

})


// Models

const usersShema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    },
})

// Definindo a collection
mongoose.model('users', usersShema)


// adicionado um registro

const novousuario = mongoose.model('users')

new novousuario({
    nome: "javier",
    sobrenome: "fois",
    email: "emaifl@gmail.com",
    idade: 44,
    pais: "Uruguay"
}).save()
.then(() => {
    console.log('usuario cadastrado com sucesso')
})
.catch((e) =>{
    console.log('Erro ao cadastrar um novo usuario', e) 
})




