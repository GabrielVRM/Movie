const knex = require("../database/knex")
const AppError = require ("../utils/appError")


class MovieControllers{
   async create(req, res){
        const { name, description, note_movie, nameTag} = req.body
       const { user_id } = req.params
       
       const userExist = await knex("users").where({ id: user_id }).first()

       if(!userExist) throw new AppError("user undefined")

        const [movie_id] = await knex("movie_notes").insert({
            name, description, note_movie, user_id
        })

       
       const MovieTag = await knex("movie_tags").insert({
           name: nameTag,
           user_id,
           movie_id

       })

       res.json({})

   }
    
   async Show(req, res){
    const {user_id} = req.params
     const moviesUser =  await knex("movie_notes").where({
           user_id: user_id
     }).first();
     if(!user_id) throw new AppError("user undefined")

    res.json({moviesUser})

}
}

module.exports = MovieControllers