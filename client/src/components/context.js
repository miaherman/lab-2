import { Component, createContext } from "react";

export const TwitturContext = createContext({
  getSignedInUser: () => {},
  signedInUser: "",
  posts: [],
  getPostsFromDb: () => {},
  makeRequest: () => {},
  createPost: () => {},
  deletePost: () => {},
  editPost: () => {},
  loginUser: () => {},
  registerUser: () => {}

});

class TwitturProvider extends Component {
  state = {
    signedInUser: "",
    posts: []
  };

  getSignedInUser = (signedInUser) => {
    this.setState({ signedInUser: signedInUser });
  };

  async makeRequest(url, method, body) {
    const response = await fetch(url, {
      method: method,
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  }

  loginUser = async (username, password) => {
    const body = { username: username, password: password };
    const login = await this.makeRequest(
      "/api/user/login",
      "POST",
      body
    );
    console.log(login)
    return login;
  }

  registerUser = async(username, password) => {
    const body = { username: username, password: password };
    const login = await this.makeRequest("/api/user/register", "POST", body);
    return login
  }

  deletePost = async (deletedPost) => {
    await this.makeRequest(`/api/post/${deletedPost._id}`, "DELETE");
  }

  createPost = async (postBody) => {
    const post = await this.makeRequest("/api/post", "POST", postBody);
    this.setState(({ posts }) => ({ posts: [...posts, post] }));
  }


  editPost = async (editedPost, text, username) => {

    const newBody = { text: text, username: username };
    await this.makeRequest(`/api/post/${editedPost._id}`, "PUT", newBody);
  }

  async getPostsFromDb() {
    let posts = await this.makeRequest("/api/post", "GET");
    this.setState({ posts: posts });
  }

  componentDidMount() {
    this.getPostsFromDb();
  }

  render() {
    return (
      <TwitturContext.Provider
        value={{
          ...this.state,
          getSignedInUser: this.getSignedInUser,
          makeRequest: this.makeRequest,
          getPostsFromDb: this.getPostsFromDb,
          createPost: this.createPost,
          deletePost: this.deletePost,
          editPost: this.editPost,
          loginUser: this.loginUser,
          registerUser: this.registerUser
        }}
      >
        {this.props.children}
      </TwitturContext.Provider>
    );
  }
}

export default TwitturProvider;