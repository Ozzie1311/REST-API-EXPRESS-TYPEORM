import express from "express";
import profesorController from "../controller/profesorController";
const router = express.Router();

router.get("/", profesorController.consultar);
router.post("/", profesorController.ingresar);

router
  .route("/:id")
  .get(profesorController.consultarDetalle)
  .put(profesorController.actualizar)
  .delete(profesorController.eliminar);

export default router;
