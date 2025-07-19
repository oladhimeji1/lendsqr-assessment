export async function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("phone").notNullable().unique();
    table.string("bvn").notNullable();
    table.string("bvn_phone_number").notNullable();
    table.date("dob").notNullable();
    table.string("name").notNullable();
    table.string("bank_code").notNullable();
    table.string("state").notNullable();
    table.string("lga").notNullable();
    table.string("city").notNullable();
    table.string("address").notNullable();
    table.string("photo_url").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("users");
}
