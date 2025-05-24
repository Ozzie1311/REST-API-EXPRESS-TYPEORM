import express from "express";
import cursoController from "../controller/cursoController";
const router = express.Router();

router.get("/", cursoController.consultar);
router.post("/", cursoController.ingresar);
router.post("/registrar", cursoController.inscribirEstudiante);
router
  .route("/:id")
  .get(cursoController.consultarDetalle)
  .put(cursoController.actualizar)
  .delete(cursoController.eliminar);

export default router;
