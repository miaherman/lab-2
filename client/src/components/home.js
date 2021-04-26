import React, { useContext } from 'react'
import { TwitturContext } from "./context";

function Home() {

const { posts } = useContext(TwitturContext);
// const [posts, getPosts] = useState([]);

//   async function makeRequest(url, method) {
//     const response = await fetch(url, {
//       method: method,
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const result = await response.json();
//     return result;
//   }

//   async function getPostsFromDb() {
//     let posts = await makeRequest("/api/post", "GET");
//     getPosts(posts)
//   }

  return (
    <div>
      <h1>Welcome to Twittuurd</h1>
      {posts.map((post) => (
        <div key={post._id}>
            {post.username}
            {post.text}
            {post.created}
        </div>
      ))}
    </div>
  );
}

export default Home;
