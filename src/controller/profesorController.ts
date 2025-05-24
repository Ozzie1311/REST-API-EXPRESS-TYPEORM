import { Request, Response } from "express";
import { Profesor } from "../models/profesorModel";

class ProfesorController {
  constructor() {}

  async ingresar(req: Request, res: Response) {
    try {
      const registro = await Profesor.save(req.body);
      res.status(201).json({ mensaje: "Profesor creado con éxito" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async consultar(req: Request, res: Response) {
    try {
      const registro = await Profesor.find();
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
      const registroId = await Profesor.findOneBy({ id: Number(id) });
      if (!registroId) {
        throw new Error("Profesor no encontrado");
      }
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
      const profesorId = await Profesor.findOneBy({ id: Number(id) });

      if (!profesorId) {
        throw new Error("Profesor no encontrado");
      }

      await Profesor.update({ id: Number(id) }, req.body);
      const registroActualizado = await Profesor.findOneBy({ id: Number(id) });
      res.status(200).json(registroActualizado);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async eliminar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const profesorId = await Profesor.findOneBy({ id: Number(id) });

      if (!profesorId) {
        throw new Error("Profesor no encontrado");
      }

      await Profesor.delete({ id: Number(id) });

      res.status(204);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}

export default new ProfesorController();
