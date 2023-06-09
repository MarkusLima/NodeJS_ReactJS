const express = require("express");
const cors = require("cors");
const router = require("./src/route/task.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(5000, () => console.log(`Servidor iniciado na porta 5000`));