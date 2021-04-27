import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { TwitturContext } from "./context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { signedInUser } = useContext(TwitturContext);

  if (signedInUser) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="home"
              >
                <MenuIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Twitturr
            </Typography>
            <Link to="/signin" variant="body2">
              <Button color="inherit">Sign In</Button>
            </Link>
            <Link to="/register" variant="body2">
              <Button color="inherit">Register</Button>{" "}
            </Link>
            <Link to="/" variant="body2">
              <Button color="inherit">Logout</Button>{" "}
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="home"
              >
                <MenuIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Twitturr
            </Typography>
            <Link to="/signin" variant="body2">
              <Button color="inherit">Sign In</Button>
            </Link>
            <Link to="/register" variant="body2">
              <Button color="inherit">Register</Button>{" "}
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
