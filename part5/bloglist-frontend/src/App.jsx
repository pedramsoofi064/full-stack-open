import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import NewBlogFrom from "./components/newBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showNotification = (message, type) => {
    setMessage(message);
    setMessageType(type);

    if (!message) return;
    setTimeout(() => {
      showNotification("", "");
    }, 5_000);
  };

  useEffect(() => {
    const loggedInUserData = window.localStorage.getItem("loggedInUser");
    if (loggedInUserData) {
      const user = JSON.parse(loggedInUserData);
      setUser(user);
      blogService.setToken(user.token);
      getBlogs();
    }
  }, []);

  const getBlogs = async () => {
    const response = await blogService.getAll();
    setBlogs(response);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await loginService.login({ username, password });
      setUser(response);

      blogService.setToken(response.token);
      getBlogs();
      window.localStorage.setItem("loggedInUser", JSON.stringify(response));
    } catch (error) {
      console.log(error);
      showNotification(error.response.data.error, "error");
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const handleCreateNewBlog = async ({ author, title, url }) => {
    try {
      const response = await blogService.create({ author, title, url });
      setBlogs(blogs.concat(response));
      showNotification(
        `a new Blog ${response.title} by ${response.author} added`,
        "success"
      );
    } catch (error){
      console.log(error);
      showNotification(error.response.data.error, "error");
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType}></Notification>
        <LoginForm login={handleLogin}></LoginForm>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType}></Notification>

      <p>
        {user.name} logged in. <button onClick={handleLogOut}>logout</button>
      </p>
      <NewBlogFrom handleSubmit={handleCreateNewBlog}></NewBlogFrom>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
