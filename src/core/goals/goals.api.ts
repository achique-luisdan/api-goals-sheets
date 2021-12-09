import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Goal } from '../../entities/goal';
import { ListGoals, ReadGoal } from './goals-responses';

const router = Router();

/**
 * Descripción: Consultar Metas
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
router.get('/goals', async (request: Request, response: Response) => {
  const goals = await getRepository(Goal).find();
  const results: number = goals.length;
  const readGoals: ReadGoal [] = [];
  goals.forEach((element) => {
    const readGoal: ReadGoal =
    new ReadGoal();
    readGoal.goal = element;
    readGoal.progress = element.calculateProgress();
    readGoals.push(readGoal);
  });
  const listGoals: ListGoals = new ListGoals();
  listGoals.goals = readGoals;
  listGoals.msg = 'Consulta exitosa';
  listGoals.results = results;
  listGoals.code = response.statusCode;
  response.jsonp(
    listGoals,
  );
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
  const readGoal: ReadGoal = new ReadGoal();
  readGoal.goal = result!;
  readGoal.progress = result?.calculateProgress()!;
  response.json(readGoal);
});

/**
 * Descripción: Editar Meta por ID
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
router.put('/goals/:id', async (request: Request, response: Response) => {
  const goal = await getRepository(Goal).findOne(
    { 'id': Number(request.params.id) },
  );
  if (goal) {
    getRepository(Goal).merge(goal, request.body);
    const result = getRepository(Goal).save(goal);
    response.json(result);
  }
});


/**
 * Descripción: Eliminar objetivo por ID
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
router.delete('/goals/:id', async (request: Request, response: Response) => {
  const goal = await getRepository(Goal).findOne(
    { 'id': Number(request.params.id) },
  );
  if (goal) {
    const result = getRepository(Goal).remove(goal);
    response.json(result);
  }
});


export default router;
