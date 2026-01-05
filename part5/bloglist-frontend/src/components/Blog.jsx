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
    <div style={blogStyle} className="blog">
      {blog.title}{" "}
      <button className="show" onClick={toggleVisibility}>
        view
      </button>
    </div>
  ) : (
    <div style={blogStyle}>
      <p>
        {" "}
        {blog.title} <button onClick={toggleVisibility}>hide</button>
      </p>
      <p>{blog.url}</p>
      <p>
        <span className="like-number">{blog.likes}</span>
        <button className="likeBtn" onClick={addLike}>
          like
        </button>
      </p>
      <p>{blog.author}</p>
      {blog.author === user?.name ? (
        <p>
          <button onClick={removeBlog}>remove</button>
        </p>
      ) : null}
    </div>
  );
};

export default Blog;
