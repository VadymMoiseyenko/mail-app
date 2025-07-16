import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("emails", (table) => {
    table.increments("id").primary();
    table.text("to");
    table.text("cc");
    table.text("bcc");
    table.string("subject");
    table.text("body");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("emails");
}
