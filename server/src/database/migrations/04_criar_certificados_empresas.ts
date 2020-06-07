import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('certicados_empresas', table => {
        table.increments('id').primary();

        table.integer('empresa_id')
            .notNullable()
            .references('id')
            .inTable('empresas');

        table.integer('certificado_id')
            .notNullable()
            .references('id')
            .inTable('certificados');

        table.integer('ano').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('certicados_empresas');
}