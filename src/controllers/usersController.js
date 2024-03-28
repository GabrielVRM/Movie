//controllers criados com o conceito de POO > classes
const knex = require("../database/knex")


//para utilizar o appError devemos utilizar da biblioteca do node o: express-async-errors --save  
const AppError = require ("../utils/appError")

class UsersController {

  async created(req, res){
        const { name, email, password } = req.body
    

   await knex("users").insert({
            name, 
            email, 
            password
        })

    res.json()
    };

    async show(req, res) {
        const { id } = req.params
        
    const user = await knex("users").where({ id }).first();
if(!user) throw new AppError("user undefined")
        
        return res.json({
            user
            
        })
    }
} 

module.exports = UsersController