exports.up = function (knex) {
  return knex.schema.createTable("wallets", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");

    // Full wallet schema
    table.bigInteger("org_id").nullable();
    table.string("savings_id").nullable();
    table.string("account_name").nullable();
    table.string("account_no").nullable();
    table.string("provider").defaultTo("lendsqr");
    table.string("type").defaultTo("default");
    table.string("currency").defaultTo("NGN");
    table.decimal("account_balance", 14, 2).defaultTo(0.0);
    table.timestamp("balance_last_updated").defaultTo(knex.fn.now());
    table.boolean("is_primary").defaultTo(true);
    table.decimal("pending_transaction", 14, 2).defaultTo(0.0);
    table.timestamp("created_on").defaultTo(knex.fn.now());
    table.bigInteger("created_by").nullable();
    table.timestamp("modified_on").nullable();
    table.bigInteger("modified_by").nullable();
    table.boolean("deleted_flag").defaultTo(false);
    table.timestamp("deleted_on").nullable();
    table.bigInteger("deleted_by").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("wallets");
};
