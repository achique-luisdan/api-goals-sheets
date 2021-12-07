import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from './action';

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
}
