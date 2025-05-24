import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Profesor } from "./profesorModel";
import { Estudiante } from "./estudianteModel";

@Entity()
export class Curso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Profesor, (profesor) => profesor.curso)
  profesor: Profesor;

  @ManyToMany(() => Estudiante)
  @JoinTable({
    name: "cursos_estudiantes",
    joinColumn: { name: "estudiante_id" },
    inverseJoinColumn: { name: "cursos_id" },
  })
  estudiantes: Estudiante[];
}
