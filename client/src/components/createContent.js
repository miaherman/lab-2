import React, { useState, useContext } from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { TwitturContext } from "./context";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: '10rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const CreateContent = () => {
  const classes = useStyles();
  const { createPost } = useContext(TwitturContext);
  const [text, setText] = useState("");
  const { signedInUser } = useContext(TwitturContext);

  const prepareToCreatePost = () => {
    const body = { text: text, username: signedInUser };

    if (signedInUser.length > 0) {
      console.log(signedInUser)
      createPost(body)
    } else {
      alert("No logged in user...")
    }
  }

  return (
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={e => e.preventDefault()}>
            <TextareaAutosize
              onChange={ (event) => setText(event.target.value)}
              rowsMin={6}
              aria-label="maximum height"
              placeholder="Skriv din text här"
            />
            <Button
              onClick={prepareToCreatePost}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              POSTUR
            </Button>
          </form>
        </div>
      </Container>
  );
};

export default CreateContent;
