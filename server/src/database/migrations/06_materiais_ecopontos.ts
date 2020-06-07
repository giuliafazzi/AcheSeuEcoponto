import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('materiais_ecopontos', table => {
        table.increments('id').primary();

        table.integer('ecoponto_id')
            .notNullable()
            .references('id')
            .inTable('ecopontos');

        table.integer('material_id')
            .notNullable()
            .references('id')
            .inTable('materiais');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('materiais_ecopontos');
}