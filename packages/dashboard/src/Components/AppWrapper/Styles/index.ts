import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition:
      theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }) + " !important",
  },
  appBarShift: {
    marginLeft: drawerWidth + "px !important",
    width: `calc(100% - ${drawerWidth}px) !important`,
    transition:
      theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }) + " !important",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    transition: `all ${theme.transitions.duration.enteringScreen + 200}ms ${
      theme.transitions.easing.sharp
    }`,
    overflow: "hidden !important",
    width: 0,
    height: 0,
    opacity: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    willChange: "width",
    "& > div": {
      transition: `width ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}`,
    },
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    zIndex: 0,
    overflowX: "hidden",
    width: `calc(${theme.spacing(5)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(7)} + 1px)`,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default useStyles;
