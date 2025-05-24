import { Request, Response } from "express";
import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesorModel";
import { Estudiante } from "../models/estudianteModel";

class CursoController {
  constructor() {}

  async consultar(req: Request, res: Response) {
    try {
      const cursoInfo = await Curso.find({
        relations: { profesor: true, estudiantes: true },
      });
      res.status(200).json(cursoInfo);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async consultarDetalle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cursoInfo = await Curso.findOne({
        where: { id: Number(id) },
        relations: { profesor: true, estudiantes: true },
      });

      if (!cursoInfo) {
        throw new Error("Curso no encontrado");
      }

      res.status(200).json(cursoInfo);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async ingresar(req: Request, res: Response) {
    try {
      const { profesor } = req.body;

      const findProfesor = await Profesor.findOneBy({ id: Number(profesor) });

      if (!findProfesor) {
        throw new Error("Profesor no encontrado.");
      }

      const curso = await Curso.save(req.body);
      res.status(201).json(curso);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async actualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { profesor } = req.body;

      const findCurso = await Curso.findOneBy({ id: Number(id) });
      const findProfesor = await Profesor.findOneBy({ id: Number(profesor) });

      if (!findCurso) {
        throw new Error("Curso no encontrado.");
      }

      if (!findProfesor) {
        throw new Error("Profesor no encontrado.");
      }

      await Curso.update({ id: Number(id) }, req.body);

      await Curso.findOne({
        where: { id: Number(id) },
        relations: { profesor: true, estudiantes: true },
      });

      res.status(200).json({ mensaje: "Registro actualizado con éxito" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async eliminar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const findCurso = await Curso.findOneBy({ id: Number(id) });

      if (!findCurso) {
        throw new Error("Curso no encontrado");
      }

      await Curso.delete({ id: Number(id) });

      res.status(202).json({ mensaje: "Curso eliminado con éxito" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async inscribirEstudiante(req: Request, res: Response) {
    try {
      const { curso_id, estudiante_id } = req.body;

      const curso = await Curso.findOne({
        where: { id: Number(curso_id) },
        relations: { profesor: true, estudiantes: true },
      });

      const estudiante = await Estudiante.findOneBy({
        id: Number(estudiante_id),
      });

      if (!curso) {
        throw new Error("Curso no encontrado");
      }

      if (!estudiante) {
        throw new Error("Estudiante no encontrado");
      }

      curso.estudiantes = curso.estudiantes || [];
      curso.estudiantes.push(estudiante);

      const actCurso = await Curso.save(curso);
      res.status(200).json(actCurso);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}

export default new CursoController();
