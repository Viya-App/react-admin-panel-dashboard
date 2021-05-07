//@referece-docs http://knexjs.org/
import { Request, response } from "express";
import Database from ".";
import { app } from "../App";
import isObject from "lodash/isObject";

type anyObject = { [key: string]: any };

type userQueryParams = {
  collectionName: string;
  id: any;
};

app.delete(
  "/api/delete-row",
  (req: Request<{}, {}, {}, userQueryParams>, res) => {
    try {
      const data: userQueryParams = req.query;
      Database(data.collectionName)
        .where("id", "=", data.id)
        .delete()
        .then(() => res.status(200).json({ status: true }))
        .catch((error) => res.status(400).json({ error }));
    } catch (error) {
      res.status(400).json({ error, status: false });
    }
  }
);
