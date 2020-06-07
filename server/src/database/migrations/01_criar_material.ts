import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('materiais', table => {
        table.increments('id').primary();
        table.string('material').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('materiais');
}