//@referece-docs http://knexjs.org/
import { Request, response } from "express";
import Database from ".";
import { app } from "../App";
import isObject from "lodash/isObject";
import * as Knex from "knex";

type anyObject = { [key: string]: any };

type joinTypes =
  | "leftJoin"
  | "leftOuterJoin"
  | "rightJoin"
  | "rightOuterJoin"
  | "outerJoin"
  | "fullOuterJoin"
  | "crossJoin";

type userQueryParams = {
  collectionName: string;
  select?: string | string[]; //alınacak sütunların idsi
  where?: anyObject | [string, string, any][] | [string, any][]; // {id:3} | ["id",">",3] | [["id",">",3],["name","ilike","deneme%"]]
  // collectionName in column scope
  joinScope?: string;
  //target => table Name || scope => column name
  join?: { types: joinTypes; target: string; scope: string }[];
  offset: number;
  limit: number;
};

app.get("/api/find", (req: Request<{}, {}, {}, userQueryParams>, res) => {
  try {
    const {
      collectionName,
      select = "*",
      join,
      joinScope,
      where,
      offset = 0,
      limit = 10,
    } = req.query;
    const table = Database.from(collectionName);

    // Select Statement
    if (Array.isArray(select)) {
      table.select(...select);
    } else {
      table.select(select);
    }

    // Join Rules

    if (Array.isArray(join)) {
      join.forEach((j) =>
        table[j.types](
          j.target,
          `${collectionName}.${joinScope}`,
          "=",
          `${j.target}.scope`
        )
      );
    }

    // Where Rules
    if (where !== undefined) {
      if (isObject(where)) {
        table.where(where);
      }
      if (Array.isArray(where)) {
        where.forEach((query: [string, string, any] | [string, string]) => {
          //@ts-ignore
          table.where(...query);
        });
      }
    }

    //Offset And Limit
    table.limit(limit).offset(offset);

    // Response OR Catch Error

    table
      .then((data) => res.status(200).json(data))
      .catch((error) => response.status(400).json({ error }));
  } catch (error) {
    res.status(400).json({ error, status: false });
  }
});
