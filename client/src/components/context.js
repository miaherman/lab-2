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
  registerUser: () => {},
  logOutUser: () => {},
  loggedIn: false,
});

class TwitturProvider extends Component {
  state = {
    signedInUser: "",
    posts: [],
    loggedIn: false
  };

  getSignedInUser = (signedInUser) => {
    this.setState({ signedInUser: signedInUser });
  };

  async makeRequest(url, method, body) {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
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
    alert(login)

      if (login === "You are logged in!") {
        this.setState({ loggedIn: true })
      }

    return login;
  }

  registerUser = async(username, password) => {
    const body = { username: username, password: password };
    const register = await this.makeRequest("/api/user/register", "POST", body);
    alert(register)
    return register
  }

  logOutUser = async() => {
    const logout = await this.makeRequest("/api/user/logout", "DELETE");

    this.setState({ loggedIn: false })

    alert(logout)
    return logout
  }

  deletePost = async (deletedPost) => {
    await this.makeRequest(`/api/post/${deletedPost._id}`, "DELETE");
  }

  createPost = async (postBody) => {
    const post = await this.makeRequest("/api/post", "POST", postBody);

    this.setState(({ posts }) => ({ posts: [...posts, post] }));

    // console.log(this.loggedIn)
    // if (this.loggedIn === false) {
    //   alert(post)
    // }
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
          registerUser: this.registerUser,
          logOutUser: this.logOutUser
        }}
      >
        {this.props.children}
      </TwitturContext.Provider>
    );
  }
}

export default TwitturProvider;