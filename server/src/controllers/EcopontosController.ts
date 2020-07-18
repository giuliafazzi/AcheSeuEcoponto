import { Request, Response } from 'express';
import knex from '../database/connection';

class EcopontosController {
    // Cadastrar um novo ecoponto
    async create(request: Request, response: Response) {
        const {
            nome,
            cep,
            bairro,
            endereco,
            cidade,
            estado,
            latitude,
            longitude,
            telefone,
            email,
            materiais
        } = request.body;

        const trx = await knex.transaction();

        const id = await trx('ecopontos').insert({
            nome,
            cep,
            bairro,
            endereco,
            cidade,
            estado,
            latitude,
            longitude,
            telefone,
            email
        });

        const materiaisEcoponto = materiais.map((material_id: number) => {
            return {
                material_id,
                ecoponto_id: id[0],
            };
        });

        await trx('materiais_ecopontos').insert(materiaisEcoponto);
        await trx.commit();

        return response.json({ success: true });
    }

    // Mostrar informações de um ecoponto específico
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const ecoponto = await knex('ecopontos').where('id', id).first();

        if (!ecoponto) {
            return response.status(400).json({ message: 'Ecoponto não encontrado' });
        }

        const materiais = await knex('materiais')
            .join('materiais_ecopontos', 'materiais.id', '=', 'materiais_ecopontos.material_id')
            .where('materiais_ecopontos.ecoponto_id', id)
            .select('materiais.material');

        return response.json({ ecoponto, materiais });
    }

    // Listar ecopontos
    async index(request: Request, response: Response) {
        const { materiais } = request.query;

        const parsedMateriais = String(materiais)
            .split(',')
            .map(material => Number(material.trim()));

        const ecopontos = await knex('ecopontos')
            .join('materiais_ecopontos', 'ecopontos.id', '=', 'materiais_ecopontos.ecoponto_id')
            .whereIn('materiais_ecopontos.material_id', parsedMateriais)
            .distinct()
            .select('ecopontos.*');

        return response.json({ ecopontos });
    }
};

export default EcopontosController;