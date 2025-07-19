exports.up = function(knex) {
  return knex.schema.createTable("documents", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.string("url").notNullable();
    table.integer("type_id").notNullable();
    table.integer("sub_type_id").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("documents");
};
