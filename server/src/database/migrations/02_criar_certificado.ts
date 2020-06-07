import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('certificados', table => {
        table.increments('id').primary();
        table.string('certificado').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('certificados');
}