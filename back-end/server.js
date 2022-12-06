import express from "express";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

//router
import user from "./routes/user";
import device from "./routes/device";
import admin from "./routes/admin";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use((error, req, res, next) => {
  console.log(error);
  return res.sendStatus(500);
});

//config swagger
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: process.env.API_BASE_URL,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//config env

//database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connect database successfully"));

//router
app.use("/api", user);
app.use("/api", device);
app.use("/api", admin);

//port
const port = process.env.PORT || 8000;

//socket.io
const httpServer = http.createServer(app);
const io = new Server({
  cors: {
    origin: "*",
  },
});

io.attach(httpServer);

io.on("connection", (socket) => {
  socket.on("connected", () => {});
  socket.on("disconnect", () => {});
  socket.on("devices_register", () => {
    io.emit("success_form");
  });
});

httpServer.listen(port, function () {
  console.log("Start with port: ", port);
});
