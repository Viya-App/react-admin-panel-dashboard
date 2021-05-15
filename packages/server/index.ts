import { app, port } from "./App";
import "./Database";
import "./Routes/Crud/TableBuilder";
import "./Routes/Crud/Get";
import "./Routes/Crud/Post";
// import "./Routes/Crud/TableBuilder";
import "./Routes/CRUD/Delete";
import "./Routes/Crud/Update";
import "./Storage";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
