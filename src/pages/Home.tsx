import { useEffect, useState } from "react";
import PostItem from "../components/postItem/PostItem";
import axios from "axios";
import { ModalType, PostType, UserType } from "../interfaces/types";
import "./Home.css";


function Home() {
  const [posts, setPosts] = useState([]);

  const [visible, setVisiable] = useState(3);

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_limit=20`)
      .then((res) => setPosts(res.data));
  }

  const handleDelete = (id: number) => {
    axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => {
      setPosts(posts.filter((post:PostType) => post.id !== id))
      });
      
  };

  const showMorePosts = () => {
    setVisiable((pre) => pre + 3);
  };

  return (
    <div className="main">
        {posts &&
          posts
            .slice(0, visible)
            .map((post: PostType & UserType & ModalType, index) => (
              <PostItem
                key={index}
                id={post.id}
                userId={post.userId}
                title={post.title}
                body={post.body}
                avatar={post.avatar}
                first_name={post.first_name}
                last_name={post.last_name}
                onDelete={() => handleDelete(post.id)}
                onClose={post.onClose}
                isOpen={post.isOpen}
              ></PostItem>
            ))}
      <button className="load-more-btn" onClick={showMorePosts}>
        Load More
      </button>
    </div>
  );
}

export default Home;
