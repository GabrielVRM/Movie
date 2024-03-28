const { Router } = require("express")
const UsersController = require("../controllers/usersController")
const AppError = require("../utils/appError")
const userRouters = Router()



function userCreatedMiddleware(req, res, next) {
    
    if (!req.body.name || !req.body.email || !req.body.password) throw new AppError("name, email and password required!")
    
    console.log("voce passou pelo midlleware")
    
    next()
}



const usersController = new UsersController(); 
userRouters.post("/", userCreatedMiddleware, usersController.created)

userRouters.get("/:id", usersController.show)


module.exports = userRouters;