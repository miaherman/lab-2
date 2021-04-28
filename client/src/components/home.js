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
  const { user, posts, editPost, deletePost } = useContext(TwitturContext);
  const classes = useStyles();

  return (
    <div className={classes.container}>

      {user && (
        <h1>Welcome {user.username}</h1>
      )}
      
      <CreateContent />
      {posts.slice(0).reverse().map((post) => (
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
          {user.username === post.username && (
            <CardActions>
              <Button onClick={() => editPost(post)} size="small">
                Edit
              </Button>
              <Button onClick={() => deletePost(post)} size="small">
                Delete
              </Button>
            </CardActions>
          )}
        </Card>
      ))}
    </div>
  );
}
