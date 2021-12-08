import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Goal } from './goal';

@Entity()
/**
 * Descripción: Clase Acción
 * Autor: achique-luisdan
 * Fecha: 07-12-2021
 */
export class Action {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    done: boolean;

  @Column()
    description: string;

  @ManyToOne((type) => Goal, (goal) => goal.actions)
    goal: Goal;
}
