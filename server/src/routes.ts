import express, { request, response } from 'express';

import EmpresasController from './controllers/EmpresasController';
import MateriaisController from './controllers/MateriaisController';
import EcopontosController from './controllers/EcopontosController';
import CertificadosController from './controllers/CertificadosController';

const routes = express.Router();

const empresasController = new EmpresasController();
const materiaisController = new MateriaisController();
const ecopontosController = new EcopontosController();
const certificadosController = new CertificadosController();

// Materiais
routes.get('/materiais', materiaisController.index);

// Empresas
routes.post('/empresas', empresasController.create);
routes.get('/empresas/:id', empresasController.show);

// Ecopontos
routes.post('/ecopontos', ecopontosController.create);
routes.get('/ecopontos/:id', ecopontosController.show);

// Certificados
routes.get('/certificados', certificadosController.index);

export default routes;