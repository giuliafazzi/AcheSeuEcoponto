import express, { request, response } from 'express';

import EmpresasController from './controllers/EmpresasController';
import MateriaisController from './controllers/MateriaisController';

const routes = express.Router();
const empresasController = new EmpresasController();
const materiaisController = new MateriaisController();

routes.get('/materiais', materiaisController.index);

routes.post('/empresas', empresasController.create);
routes.get('/empresas/:id', empresasController.show);

export default routes;