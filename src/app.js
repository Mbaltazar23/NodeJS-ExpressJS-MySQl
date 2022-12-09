// requerir de metodos express, path, morgan, mysql y su conector para poder crear las instancias y que funcione el servidor
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const MyConexion = require("express-myconnection");
const app = express();

// importar rutas
const productsRouter = require("./routes/products");
// ajustes del servidor
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// configurar middleware
app.use(morgan("dev"));
app.use(
  MyConexion(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "1234",
      port: 3306,
      database: "bd_video",
    },
    "single"
  )
);

app.use(express.urlencoded({ extended: false }));

// rutas => /products
app.use("/", productsRouter);

// archivos staticos
app.use(express.static(path.join(__dirname, "public")));

// iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server online in the port 3000`);
});
