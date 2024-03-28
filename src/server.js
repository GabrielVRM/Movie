// pegando a pasta de funcionalidades do express e colocando no "express" 
require("express-async-errors")
const AppError = require("./utils/appError")
const express = require("express");
const routes = require('./routes') 
const database = require("./database/sqlite")

// o app, serve para inicializar o express
const app = express();
app.use(express.json())
database();

app.use(routes)


app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
console.log(error)
    return res.status(500).json({
        status: "error",
        message:"internal server error"
    })
})


// ports que o express vai ficar escultando as request, solicitações.
const PORT = 3333;
app.listen(PORT, () => console.log(`Serve is runnig on Port ${PORT}`))


