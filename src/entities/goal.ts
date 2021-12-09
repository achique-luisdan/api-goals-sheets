import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from './action';

/**
 * Descripción: Clase contiene la información del progreso de un objetivo
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
export class Progress {
  done: number;
  todo: number;
  quantity: number;
  percent: number;
}

@Entity()
/**
 * Descripción: Clase Meta
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
export class Goal {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    startDate: string;

  @Column()
    endDate: string;

  @OneToMany((type) => Action, (action) =>
    action.goal, { eager: true, cascade: true })
    actions: Action[];

  /**
   * Descripción: Función para calcular el porcentaje de progreso
   * Fecha: 09-12-2021
   * @return {Progress} Porcentaje de progreso
   */
  calculateProgress(): Progress {
    let percent: number = 0;
    let done: number = 0;
    let todo: number = 0;
    const quantity: number = this.actions.length;
    try {
      this.actions.forEach((element) => {
        if (element.done) {
          done = done + 1;
        } else {
          todo = todo + 1;
        }
      });
      percent = done * 100 / quantity;
    } catch (error) {
      percent = -1;
    }
    const progress: Progress = new Progress();
    progress.done = done;
    progress.todo = todo;
    progress.quantity = quantity;
    progress.percent = percent;
    return progress;
  }
}
