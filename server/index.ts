import express from "express";
import cors from "cors";
import Database from "./Database";
import Storage from "./Storage";

const app = express();
const port = 8888;

app.use(express.json(), cors());
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
Storage(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
