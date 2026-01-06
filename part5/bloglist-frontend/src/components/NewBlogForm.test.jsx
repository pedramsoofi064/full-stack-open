import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

describe("<NewBlogForm />", () => {
  test("create a new blog to ensure that the form calls the callback function it receives as props with the correct data when the blog is created", async () => {
    const user = userEvent.setup();
    const createBlog = vi.fn();

    render(<NewBlogForm handleSubmit={createBlog} />);

    const titleInput = screen.getByLabelText("title");
    const authorInput = screen.getByLabelText("author");
    const urlInput = screen.getByLabelText("url");

    const testBlog = {
      title: "testing title",
      author: "testing author",
      url: "testing url",
    };
    await user.type(titleInput, testBlog.title);
    await user.type(authorInput, testBlog.author);
    await user.type(urlInput, testBlog.url);

    const button = screen.getByText("create");
    await user.click(button);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual(testBlog);
  });
});
