//@referece-docs http://knexjs.org/
import { Request, response } from "express";
import Database from ".";
import { app } from "../App";
import isObject from "lodash/isObject";

type anyObject = { [key: string]: any };

type userQueryParams = {
  collectionName: string;
  data: anyObject | anyObject[];
};

app.post(
  "/api/create-row",
  (req: Request<{}, {}, userQueryParams, {}>, res) => {
    try {
      const data: userQueryParams = req.body;

      if (Array.isArray(data.data) || isObject(data.data)) {
        Database(data.collectionName)
          .insert(data.data)
          .returning("*")
          .then((d) => res.status(200).json({ status: true, data: d }))
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
  }
);
