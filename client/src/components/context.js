import { Component, createContext } from "react";

export const TwitturContext = createContext({
  posts: [],
  getPostsFromDb: () => {},
  makeRequest: () => {},
  createPost: () => {},
  deletePost: () => {},
  editPost: () => {},
  loginUser: () => {},
  registerUser: () => {},
  logOutUser: () => {},
  loggedIn: undefined,
});

class TwitturProvider extends Component {
  state = {
    posts: [],
    loggedIn: undefined,
    user: undefined,
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
    const user = await this.makeRequest("/api/user/login", "POST", body);
    console.log(user)

    if (user !== "Wrong username or password") {
      this.setState({ loggedIn: true, user });
    } else {
      alert(user)
    }

  };

  registerUser = async (username, password) => {
      const body = { username: username, password: password };
      const register = await this.makeRequest(
        "/api/user/register",
        "POST",
        body
      );

      alert(register);
      return register;
  };

  logOutUser = async () => {
    const logout = await this.makeRequest("/api/user/logout", "DELETE");
    this.checkIfUserIsLoggedIn();
    alert(logout);
    return logout;
  };

  deletePost = async (deletedPost) => {
    await this.makeRequest(
      `/api/post/${deletedPost._id}`,
      "DELETE"
    );
    this.getPostsFromDb();
  };

  createPost = async (postBody) => {
    const post = await this.makeRequest("/api/post", "POST", postBody);
    this.setState(({ posts }) => ({ posts: [...posts, post] }));
    this.getPostsFromDb();
  };

  editPost = async (editedPost) => {
    const newBody = { text: prompt("Ändra din post") };
    await this.makeRequest(`/api/post/${editedPost._id}`, "PUT", newBody);
    this.getPostsFromDb();
  };

  async getPostsFromDb() {
    let posts = await this.makeRequest("/api/post", "GET");
    this.setState({ posts: posts });
  }

  async checkIfUserIsLoggedIn() {
    const result = await fetch("/api/user/authenticate", { method: "POST" });
    const user = await result.json();
    this.setState({
      loggedIn: result.ok,
      user,
    });
  }

  componentDidMount() {
    this.checkIfUserIsLoggedIn();
    this.getPostsFromDb();
  }

  render() {
    console.log(this.state.loggedIn);
    return (
      <TwitturContext.Provider
        value={{
          ...this.state,
          makeRequest: this.makeRequest,
          getPostsFromDb: this.getPostsFromDb,
          createPost: this.createPost,
          deletePost: this.deletePost,
          editPost: this.editPost,
          loginUser: this.loginUser,
          registerUser: this.registerUser,
          logOutUser: this.logOutUser,
        }}
      >
        {this.props.children}
      </TwitturContext.Provider>
    );
  }
}

export default TwitturProvider;
