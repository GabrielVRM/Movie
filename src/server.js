// pegando a pasta de funcionalidades do express e colocando no "express" 
const express = require("express");
const {} = require('./routes/index') 
// o app, serve para inicializar o express
const app = express();
app.use(express.json())


// ports que o express vai ficar escultando as request, solicitações.
const PORT = 3333;
app.listen(PORT, () => console.log(`Serve is runnig on Port ${PORT}`))


