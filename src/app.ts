import express from "express";
import cors from "cors";
import morgan from "morgan";
import estudiantesRoutes from "./routes/estudiantesRoutes";
import profesoresRoutes from "./routes/profesoresRoutes";
import cursosRoutes from "./routes/cursosRoutes";

const app = express();

//Configuraciones
app.set("serverName", "Servidor de Oswaldo");
app.set("puerto", 6500);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/estudiantes", estudiantesRoutes);
app.use("/profesores", profesoresRoutes);
app.use("/cursos", cursosRoutes);

export default app;
