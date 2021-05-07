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
  (req: Request<{}, {}, {}, userQueryParams>, res) => {
    try {
      const { collectionName, data } = JSON.parse(req.body);
      const table = Database.from(collectionName);

      if (Array.isArray(data)) {
      } else if (isObject(data)) {
        table.insert(data);
      } else {
        res
          .status(400)
          .json({
            error:
              "Eklenmek istenene veri türü geçersiz. Lütfen Object veya Object Array Gönderin",
          });
      }
    } catch (error) {
      res.status(400).json({ error, status: false });
    }
  }
);
