declare module "../knexfile" {
  const { Knex } = require("knex");
  const config: { [key: string]: Knex.Config };
  export default config;
}
