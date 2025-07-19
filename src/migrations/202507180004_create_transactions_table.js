export async function up(knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.string("type").notNullable(); // fund, withdraw, transfer
    table.decimal("amount", 14, 2).notNullable();
    table.integer("sender_id").unsigned().nullable();
    table.integer("receiver_id").unsigned().nullable();
    table.string("sender_account").nullable();
    table.string("receiver_account").nullable();
    table.string("reference").unique().notNullable();
    table.timestamps(true, true);
  });
};

export async function down(knex) {
  return knex.schema.dropTable("transactions");
};
