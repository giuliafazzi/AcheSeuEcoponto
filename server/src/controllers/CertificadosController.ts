import { Request, Response } from 'express';
import knex from '../database/connection';

class CertificadosController {
    // Listar certificados
    async index(request: Request, response: Response) {
        const certificados = await knex('materiais').select('*');

        const serializedCertificados = certificados.map(certificado => {
            return {
                certificado: certificado.certificado
            };
        });

        return response.json(serializedCertificados);
    }
};

export default CertificadosController;