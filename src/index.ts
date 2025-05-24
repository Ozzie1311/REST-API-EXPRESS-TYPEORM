import app from "./app";
import AppDataSource from "./database/conexion";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos conectada con éxito");
    app.listen(app.get("puerto"), () => {
      console.log(
        `${app.get("serverName")} corriendo en el puerto: ${app.get("puerto")}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
