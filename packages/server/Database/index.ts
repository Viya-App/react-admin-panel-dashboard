import KNEX from "knex";

const Database = KNEX({
  client: "postgres",
  connection: async () => {
    return {
      host: "localhost",
      user: "postgres",
      password: "postgres",
      database: "app_wrapper",
    };
  },
});

export default Database;
