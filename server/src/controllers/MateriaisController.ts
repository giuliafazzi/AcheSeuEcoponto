import { Request, Response } from 'express';
import knex from '../database/connection';

class MateriaisController {
    // Listar materiais
    async index(request: Request, response: Response) {
        const materiais = await knex('materiais').select('*');

        const serializedMateriais = materiais.map(material => {
            return {
                id: material.id,
                nome: material.material,
                imagem_url: `http://localhost:3333/uploads/${material.imagem}`
            };
        });

        return response.json(serializedMateriais);
    }
};

export default MateriaisController;