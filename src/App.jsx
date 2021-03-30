import P from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";

const Post = ({ item, onClick }) => {
  return (
    <div key={item.id}>
      <h1 onClick={() => {onClick(item.title)}}>{item.title}</h1>
      <p>{item.body}</p>
    </div>
  )
}

const App = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const input = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((response) => setPosts(response));
  }, [])

  useEffect(() => {
    input.current.focus();
    console.log(input.current);
  }, [value])

  const handleClick = (value) => {
    setValue(value);
  }

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <input ref={input} type="search" name="search" value={value} onChange={(e) => setValue(e.target.value)} />
      {useMemo(() => (
        posts.map((item) => (<Post key={item.id} item={item} onClick={handleClick} />))
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
  onClick: P.func
}

export default App;
