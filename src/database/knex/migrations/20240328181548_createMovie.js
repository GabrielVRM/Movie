
exports.up = knex => knex.schema.createTable("movie_notes", table => {
  
    table.increments("id")
    table.text("name")
    table.text("description")
    table.integer("note_movie").checkBetween([[0, 5]])
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")


    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("modified_at").default(knex.fn.now());

})


exports.down = knex => knex.schema.dropTable("movie_notes")