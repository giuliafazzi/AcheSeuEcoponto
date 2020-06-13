import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('materiais').insert([
        { material: 'Eletronicos', imagem: 'eletronicos.svg' },
        { material: 'Pilhas e Baterias', imagem: 'baterias.svg' },
        { material: 'Papel e Papelão', imagem: 'papel.svg' },
        { material: 'Plástico', imagem: 'plastico.svg' },
        { material: 'Metais', imagem: 'metais.svg' },
        { material: 'Embalagens e resíduos de agrotóxicos', imagem: 'agrotoxicos.svg' },
        { material: 'Óleos', imagem: 'oleos.svg' },
        { material: 'Outros', imagem: 'outros.svg' },
    ]);
}