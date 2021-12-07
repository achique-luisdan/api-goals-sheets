import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Goal } from '../../entities/goal';

const router = Router();

/**
 * Descripción: Consultar Metas
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
router.get('/goals', async (request: Request, response: Response) => {
  const goals = await getRepository(Goal).find();
  response.json(goals);
});

/**
 * Descripción: Registrar Meta
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
router.post('/goals', async (request: Request, response: Response) => {
  const newGoal = await getRepository(Goal).create(
    request.body,
  );
  const result = await getRepository(Goal).save(
    newGoal,
  );
  response.json(result);
});

/**
 * Descripción: Consultar Meta por ID
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
router.get('/goals/:id', async (request: Request, response: Response) => {
  const result = await getRepository(Goal).findOne(
    { 'id': Number(request.params.id) },
  );
  response.json(result);
});

export default router;
