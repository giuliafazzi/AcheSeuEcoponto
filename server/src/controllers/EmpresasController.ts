import { Request, Response } from 'express';
import knex from '../database/connection';

class EmpresasController {
    async create(request: Request, response: Response) {
        const {
            cnpj,
            nome,
            latitude,
            longitude,
            endereco,
            cidade,
            uf,
            telefone,
            email,
            compra,
            venda,
            doacao,
            coleta,
            materiais
        } = request.body;

        const trx = await knex.transaction();

        const id = await trx('empresas').insert({
            cnpj,
            nome,
            latitude,
            longitude,
            endereco,
            cidade,
            uf,
            telefone,
            email,
            compra,
            venda,
            doacao,
            coleta
        });

        const materiaisEmpresa = materiais.map((material_id: number) => {
            return {
                material_id,
                empresa_id: id[0],
            };
        });

        await trx('materiais_empresas').insert(materiaisEmpresa);

        return response.json({ success: true });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const empresa = await knex('empresas').where('id', id).first();

        if (!empresa) {
            return response.status(400).json({ message: 'Empresa não encontrada' });
        }

        const items = await knex('materiais')
            .join('materiais_empresas', 'materiais.id', '=', 'materiais_empresas.material_id')
            .where('materiais_empresas.empresa_id', id)
            .select('materiais.material');

        return response.json({ empresa, items });
    }

    async index(request: Request, response: Response) {

    }
};

export default EmpresasController;