import express from "express";
import cors from "cors";

export const app = express();
export const port = 8888;

app.use(express.json(), express.urlencoded({ extended: true }), cors());
app.use(express.json(), express.urlencoded({ extended: true }), cors());
app.use(express.static("uploads"));
