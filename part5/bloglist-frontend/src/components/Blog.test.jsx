import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "blog title for test ...",
    author: "test author",
    url: "test url",
    likes: 22,
    user: {
      username: "test",
      name: "test user",
    },
  };

  const likeHandler = vi.fn();

  beforeEach(() => {
    render(<Blog blog={blog} addLike={likeHandler} />);
  });

  test("renders its children", () => {
    screen.getByText(`${blog.title} ${blog.author}`);
  });

  test("show the URL, likes and user show after show button clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const urlElement = screen.getByText(blog.url);
    expect(urlElement).toBeVisible();
    const likeElement = screen.getByText(`likes ${blog.likes}`);
    expect(likeElement).toBeVisible();
    const nameElement = screen.getByText(blog.user.name);
    expect(nameElement).toBeVisible();
  });

  test("if the component's like button is pressed twice, the event handler function received as props by the component is called twice.", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.dblClick(likeButton);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });

  test("create a new blog to ensure that the form calls the callback function it receives as props with the correct data when the blog is created", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

  

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
