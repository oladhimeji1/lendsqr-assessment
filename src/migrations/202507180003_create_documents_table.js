exports.up = function(knex) {
  return knex.schema.createTable("documents", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.string("url");
    table.integer("type_id");
    table.integer("sub_type_id");
    table.timestamps(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("documents");
};
