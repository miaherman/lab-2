import { Component, createContext } from "react";

export const TwitturContext = createContext({
  getSignedInUser: () => {},
  signedInUser: "",
  posts: [],
  getPostsFromDb: () => {},
  makeRequest: () => {},
  createPost: () => {}
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

  async createPost(postBody) {
    const post = await this.makeRequest("/api/post", "POST", postBody);
    this.setState(({ posts }) => ({ posts: [...posts, post] }));
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
          createPost: this.createPost
        }}
      >
        {this.props.children}
      </TwitturContext.Provider>
    );
  }
}

export default TwitturProvider;