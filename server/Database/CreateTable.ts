//@referece-docs http://knexjs.org/

import Database from "./";
import { app } from "../App";
import isObject from "lodash/isObject";

type sqlColumnType =
  | "string"
  | "int"
  | "float"
  | "uuid"
  | "boolean"
  | "date"
  | "time"
  | "timestamp"
  | "json"
  | "jsonb";

type builderTypeList = {
  name: string;
  type: sqlColumnType;
  comment?: string;
  default?: string | number | boolean;
  relation?: { name: string; table: string; relatedCol?: string };
};

type builderRequest = {
  tableName: string;
  tableComment?: string;
  columnList: builderTypeList[];
  uniqueColumns?: string[];
};

app.post("/api/create-collection", (req, res) => {
  const data: builderRequest = JSON.parse(req.body);
  if (isObject(data)) {
    Database.schema
      .createTable(data.tableName, (builder) => {
        if (data?.tableComment) {
          builder.comment(data.tableComment);
        }
        builder.increments("id");
        data.columnList.forEach((column) => {
          const col = builder[column.type](column.name);
          if (column?.default) {
            col.defaultTo(column.default);
          }
          if (column?.comment) {
            col.comment(column.comment);
          }
          if (column?.relation) {
            const { name, table, relatedCol = "id" } = column.relation;
            col
              .unsigned()
              .references(`${table}.${relatedCol}`)
              .onUpdate("CASCADE") // If Article PK is changed, update FK as well.
              .onDelete("CASCADE")
              .withKeyName(name); // If Article is deleted, delete Comment as well.;
          }
        });
        builder.timestamp("created_at").defaultTo(Database.fn.now());
        builder.timestamp("updated_at").defaultTo(Database.fn.now());
        builder.timestamp("deleted_at");
        if (Array.isArray(data.uniqueColumns)) {
          builder.unique(data.uniqueColumns);
        }
      })
      .then((data) => res.status(200).json({ isCompleted: true, result: data }))
      .catch((error) => res.status(400).json({ isCompleted: false, error }));
  }
});
