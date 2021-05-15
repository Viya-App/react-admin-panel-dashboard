import { Divider, Grid, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

type sqlColumnType =
  | "string"
  | "integer"
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
  comment?: string; //usersTableInName -> en:usersTableInName.title
  default?: string | number | boolean;
  relation?: { name: string; table: string; relatedCol?: string };
};

type builderRequest = {
  tableName: string;
  tableComment?: string;
  columnList: builderTypeList[];
  uniqueColumns?: string[];
};

const TableBuilderForm = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Formik
        initialValues={{ tableName: "", tableComment: "", columnList: [] }}
        onSubmit={console.log}
      >
        {({ handleChange }) => (
          <Grid container spacing={2}>
            <Grid xs={12} md={4} item>
              <TextField
                variant="outlined"
                onChange={handleChange("tableName")}
                fullWidth
                label={t("pages.tableBuilder.form.tableName")}
              />
            </Grid>
            <Grid xs={12} md={8} item>
              <TextField
                multiline
                variant="outlined"
                onChange={handleChange("tableComment")}
                label={t("pages.tableBuilder.form.description")}
                fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <Divider sx={{ m: "1.5% 0" }} />
              <Typography variant="subtitle1">
                {t("pages.tableBuilder.form.columns.information")}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
};

export default TableBuilderForm;
