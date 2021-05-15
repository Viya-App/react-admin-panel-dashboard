import { Divider, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import TableBuilderForm from "./Form";

const TableBuilderPage = () => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ margin: "3%", padding: "1.5%" }}>
      <Typography variant="h5">{t("pages.tableBuilder.title")}</Typography>
      <Divider sx={{ m: "2% 0" }} />

      <TableBuilderForm />
    </Paper>
  );
};

export default TableBuilderPage;
