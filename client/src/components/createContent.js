import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function makeRequest(url, method, body) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result;
}

async function createPost(text, username) {
  const body = { text: text, username: username };
  const post = await makeRequest("/api/post", "POST", body);
  console.log(post)
  return post
}

const CreateContent = () => {
  const classes = useStyles();
  const [text, setText] = useState("");

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Post
          </Typography>
          <form className={classes.form} noValidate onSubmit={e => e.preventDefault()}>
            <TextareaAutosize
              onChange={ (event) => setText(event.target.value)}
              rowsMin={4}
              aria-label="maximum height"
              placeholder="Skriv din text här"
            />
            <Button
              onClick={ async () => await createPost(text, "användarnamn") }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              POST
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CreateContent;
