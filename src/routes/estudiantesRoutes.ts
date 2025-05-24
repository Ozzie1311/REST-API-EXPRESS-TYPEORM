import express from "express";
import estudiantesController from "../controller/estudianteController";
const router = express.Router();

router.get("/", estudiantesController.consultar);
router.post("/", estudiantesController.ingresar);

router
  .route("/:id")
  .get(estudiantesController.consultarDetalle)
  .put(estudiantesController.actualizar)
  .delete(estudiantesController.eliminar);

export default router;
