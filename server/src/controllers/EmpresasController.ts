import { Request, Response } from 'express';
import knex from '../database/connection';

class EmpresasController {
    // Cadastrar uma nova empresa
    async create(request: Request, response: Response) {
        const {
            cnpj,
            nome,
            cep,
            bairro,
            endereco,
            cidade,
            estado,
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
            cep,
            bairro,
            endereco,
            cidade,
            estado,
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
        await trx.commit();

        return response.json({ success: true });
    }

    // Mostrar informações de uma empresa específica
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const empresa = await knex('empresas').where('id', id).first();

        if (!empresa) {
            return response.status(400).json({ message: 'Empresa não encontrada' });
        }

        const materiais = await knex('materiais')
            .join('materiais_empresas', 'materiais.id', '=', 'materiais_empresas.material_id')
            .where('materiais_empresas.empresa_id', id)
            .select('materiais.material');

        const certificados = await knex('certificados')
            .join('certificados_empresas', 'certificados.id', '=', 'certificados_empresas.certificado_id')
            .where('certificados_empresas.empresa_id', id)
            .select('certificados.certificado');

        return response.json({ empresa, materiais, certificados });
    }

    // Listar empresas
    async index(request: Request, response: Response) {

    }
};

export default EmpresasController;