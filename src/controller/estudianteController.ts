import { Request, Response } from "express";
import { Estudiante } from "../models/estudianteModel";
class EstudianteController {
  constructor() {}

  async ingresar(req: Request, res: Response) {
    try {
      const registro = await Estudiante.save(req.body);
      res.status(201).json(registro);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async consultar(req: Request, res: Response) {
    try {
      const registro = await Estudiante.find();
      res.status(200).json(registro);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async consultarDetalle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registroId = await Estudiante.findOneBy({ id: Number(id) });
      res.status(200).json(registroId);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async actualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registroId = await Estudiante.findOneBy({ id: Number(id) });
      if (!registroId) {
        throw new Error("Estudiante no encontrado");
      }
      await Estudiante.update({ id: Number(id) }, req.body);
      const registroActualizado = await Estudiante.findOneBy({
        id: Number(id),
      });
      res.status(201).json(registroActualizado);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async eliminar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registroId = await Estudiante.findOneBy({ id: Number(id) });
      if (!registroId) {
        throw new Error("No se encontro el estudiante");
      }
      await Estudiante.delete({ id: Number(id) });
      res.status(204).json({ mensaje: "Estudiante eliminado con éxito." });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}

export default new EstudianteController();
