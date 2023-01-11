const express = require('express');
const app = express();
const handlebars= require('express-handlebars');
const bodyParser = require('body-parser');

//const mongoose = require('mongoose');
// arquivo necessario para falar para o express onde esta as rotas
const admin = require('./routes/route-admin');
const path = require('path')
const mongoose = require('mongoose')

// Configurações
 
    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Moongoose
      mongoose.set('strictQuery', false);
      mongoose.Promise = global.Promise;
      mongoose.connect('mongodb+srv://fois2010:Siexpre$$@cluster0.9e3ejn1.mongodb.net/?retryWrites=true&w=majority').then(() => {
         console.log('Conectado a MongoDB com sucesso')
      }).catch((error) => {
         console.log('Erro ao se conectar com mongoDB' + error)
      })

    // Public
    app.use(express.static(path.join(__dirname,'/public')))

// Rotas

   app.use('/admin', admin)

const port = 8081

 app.listen(port, () => {
    console.log('Servidor Rodando!')
 })