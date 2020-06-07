import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('empresas', table => {
        table.increments('id').primary();
        table.string('cnpj').notNullable();
        table.string('nome').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('endereco').notNullable();
        table.string('cidade').notNullable();
        table.string('uf').notNullable();
        table.string('telefone').notNullable();
        table.string('email').notNullable();
        table.boolean('compra');
        table.boolean('venda');
        table.boolean('doacao');
        table.boolean('coleta');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('empresas');
}