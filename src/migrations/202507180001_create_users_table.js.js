export async function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("phone").notNullable().unique();
    table.string("bvn");
    table.string("bvn_phone_number"); 
    table.date("dob");
    table.string("name").notNullable();
    table.string("bank_code");
    table.string("state");
    table.string("lga");
    table.string("city");
    table.string("address");
    table.string("photo_url");

    table.timestamps(true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("users");
}
