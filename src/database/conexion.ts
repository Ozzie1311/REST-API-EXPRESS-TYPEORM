import { DataSource } from "typeorm";
import { Estudiante } from "../models/estudianteModel";
import { Profesor } from "../models/profesorModel";
import { Curso } from "../models/cursoModel";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "oswaldoemilio",
  database: "oswaldo",
  logging: true,
  entities: [Estudiante, Profesor, Curso],
  synchronize: true,
});

export default AppDataSource;
