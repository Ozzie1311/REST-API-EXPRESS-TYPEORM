import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Curso } from "./cursoModel";

@Entity()
export class Profesor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dni: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Curso, (curso) => curso.profesor)
  curso: Curso[];
}
