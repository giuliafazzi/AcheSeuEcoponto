import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('materiais_empresas', table => {
        table.increments('id').primary();

        table.integer('empresa_id')
            .notNullable()
            .references('id')
            .inTable('empresas');

        table.integer('material_id')
            .notNullable()
            .references('id')
            .inTable('materiais');

        table.integer('volume_minimo').notNullable();
        table.integer('volume_maximo').notNullable();
        table.string('qualidade').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('materiais_empresas');
}