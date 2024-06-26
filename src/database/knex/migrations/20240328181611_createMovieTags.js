
exports.up = knex => knex.schema.createTable("movie_tags", table => {
  
    table.increments("id")
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
    table.integer("movie_id").references("id").inTable("movie_notes").onDelete("CASCADE")
    table.text("name")

})


exports.down = knex => knex.schema.dropTable("movie_tags")