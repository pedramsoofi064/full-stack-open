import { useState } from "react";

const Blog = ({ blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return visible === false ? (
    <div style={blogStyle} className="blog" id={blog.id}>
      {blog.title} {blog.author}
      <button className="show" onClick={toggleVisibility}>
        view
      </button>
    </div>
  ) : (
    <div style={blogStyle} className="blog" id={blog.id}>
      <p>
        {" "}
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>hide</button>
      </p>
      <a href={blog.url} target="_blank">
        {blog.url}
      </a>
      <p>
        <span className="like-number">likes {blog.likes}</span>
        <button className="likeBtn" onClick={addLike}>
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
      {blog.user.username === user?.username ? (
        <p>
          <button onClick={removeBlog}>remove</button>
        </p>
      ) : null}
    </div>
  );
};

export default Blog;
