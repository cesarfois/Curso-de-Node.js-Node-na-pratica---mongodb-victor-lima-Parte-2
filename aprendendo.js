const mongoose = require("mongoose")
mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://fois2010:Siexpre$$@cluster0.9e3ejn1.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('MongoDB conectado com sucesso')
})
.catch( (error) => {
    console.log('houve um erro ao se conectar ao mongoDB:' + error )

})