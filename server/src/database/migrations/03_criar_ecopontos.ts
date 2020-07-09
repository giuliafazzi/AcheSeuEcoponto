import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('ecopontos', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('cep').notNullable();
        table.string('bairro').notNullable();
        table.string('endereco').notNullable();
        table.string('cidade').notNullable();
        table.string('uf').notNullable();
        table.string('telefone');
        table.string('email');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ecopontos');
}