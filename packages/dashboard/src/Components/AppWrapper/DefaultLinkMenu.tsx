import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PersonRounded,
  BuildRounded,
  DashboardRounded,
} from "@material-ui/icons";
// import useStyles from "./Styles";
const DefaultLinkMenu = () => {
  const { t } = useTranslation();
  return (
    <List>
      <LinkListItem
        title={t("navigations.dashboard")}
        to="/dashboard"
        icon={<DashboardRounded />}
      />
      <LinkListItem
        title={t("navigations.users")}
        to="/users"
        icon={<PersonRounded />}
      />
      <LinkListItem
        title={t("navigations.tableBuilder")}
        to="/table-builder"
        icon={<BuildRounded />}
      />
    </List>
  );
};

const LinkListItem: React.FC<{
  title: string;
  icon: React.ReactNode;
  to: string;
}> = ({ title, icon, to }) => {
  const navigate = useNavigate();

  return (
    <ListItem button onClick={() => navigate(to)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

export default DefaultLinkMenu;
