import P from "prop-types";
import { useEffect, useMemo, useState } from "react";

const Post = ({ item }) => {
  return (
    <div key={item.id}>
      <h1>{item.title}</h1>
      <p>{item.body}</p>
    </div>
  )
}

const App = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((response) => setPosts(response));
  }, [])

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <input type="search" name="search" value={value} onChange={(e) => setValue(e.target.value)} />
      {useMemo(() => (
        posts.map((item) => (<Post key={item.id} item={item} />))
      ), [posts])}
    </div>
  );
}

Post.propType = {
  item: P.shape({
    id: P.number,
    title: P.string,
    body: P.string,
  }),
}

export default App;
