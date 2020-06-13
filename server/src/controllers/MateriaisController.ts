import { Request, Response } from 'express';
import knex from '../database/connection';

class MateriaisController {
    async index(request: Request, response: Response) {
        const materiais = await knex('materiais').select('*');

        const serializedMateriais = materiais.map(material => {
            return {
                nome: material.nome,
                imagem_url: `http://localhost:3333/uploads/${material.imagem}`
            };
        });
    }
};

export default MateriaisController;