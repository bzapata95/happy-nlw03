import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';

const upload = multer(uploadConfig);

const routes = Router();

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images') ,OrphanagesController.create);


export default routes;