import express from "express";
import cors from "cors";

export const app = express();
export const port = 8888;

app.use(express.json(), express.urlencoded({ extended: true }), cors());
app.use(express.json(), express.urlencoded({ extended: true }), cors());
app.use(express.static("uploads"));

const expressSwagger = require("express-swagger-generator")(app);

let options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/v1",
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["./Database/**.ts"], //Path to the API handle folder
};
expressSwagger(options);
