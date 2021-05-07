import { app, port } from "./App";
import Database from "./Database";
import "./Database/TableBuilder";
import "./Database/Get";
import "./Database/Post";
import "./Database/TableBuilder";
import "./Storage";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
