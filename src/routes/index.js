const { Router } = require("express")

const userRouters = require("./users.routes")

const routes = Router()

routes("/notes", userRouters)