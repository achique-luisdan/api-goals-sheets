import { Goal, Progress } from '../../entities/goal';

/**
 * Descripción: Modelo Respuesta base, se hereda por otros response.
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
export class Base {
  results: number;
  msg: string;
  code: number;
}

/**
 * Descripción: Respuesta de consultar objetivos por ID.
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
export class ReadGoal {
  goal: Goal;
  progress: Progress;
}

/**
 * Descripción: Respuesta de lista de objetivos.
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
export class ListGoals extends Base {
  goals: ReadGoal [] = [];
}
