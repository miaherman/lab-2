import React, { useContext } from "react";
import { TwitturContext } from "./context";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateContent from "./createContent";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    marginBlock: 10,
  },
  title: {
    fontSize: 14,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function Home() {
  const { signedInUser, posts, editPost, deletePost } = useContext(
    TwitturContext
  );
  const classes = useStyles();

  function editPostPrompt(post) {
    if (signedInUser === post.username) {
      const openPrompt = prompt("Edittuurr yourruur posturr");
      editPost(post, openPrompt, signedInUser);
    } else if (signedInUser && signedInUser !== post.username) {
      alert('This is not your post')
    } else {
      alert('You are not logged in')
    }
  }

  function deletePostAlert(post) {
    if (signedInUser === post.username) {
      const openAlert = window.confirm("Do yourur reallyur wantur to deletur?");

      if (openAlert) {
        deletePost(post, openAlert, signedInUser);
      }
      
    } else if (signedInUser && signedInUser !== post.username) {
      alert('This is not your post')
    } else {
      alert('You are not logged in')
    }
  }

  return (
    <div className={classes.container}>

      <h1>Welcome {signedInUser}</h1>

      <CreateContent/>
      {posts.map((post) => (
        <Card key={post._id} className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {post.username}
            </Typography>
            <Typography variant="body2" component="p">
              {post.text}
              <br />
              {post.created}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => editPostPrompt(post)} size="small">
              Edit
            </Button>
            <Button onClick={() => deletePostAlert(post)} size="small">
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
