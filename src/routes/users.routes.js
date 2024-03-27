const { Router } = require("express")

const userRouters = Router()

userRouters.get("/teste", (req, res) => {
    res.json("hello")
})

module.export = userRouters;