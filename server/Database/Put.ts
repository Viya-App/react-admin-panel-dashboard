//@referece-docs http://knexjs.org/
import { Request, response } from "express";
import Database from ".";
import { app } from "../App";
import isObject from "lodash/isObject";

type anyObject = { [key: string]: any };

type userQueryParams = {
  collectionName: string;
  data: anyObject | anyObject[];
  where: anyObject;
};

app.put("/api/update-row", (req: Request<{}, {}, userQueryParams, {}>, res) => {
  try {
    const data: userQueryParams = req.body;
    const table = Database(data.collectionName);

    if (Array.isArray(data.data)) {
    } else if (isObject(data.data)) {
      table.update(data).where(data.where).returning("*");
      table
        .then((d) => res.status(200).json({ status: true, d }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(400).json({
        error:
          "Eklenmek istenene veri türü geçersiz. Lütfen Object veya Object Array Gönderin",
      });
    }
  } catch (error) {
    res.status(400).json({ error, status: false });
  }
});
