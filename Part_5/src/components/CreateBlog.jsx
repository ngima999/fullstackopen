import { useState } from "react";

const CreateBlog = ({ user, handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");

    if (!user || !user.token) {
      console.error("User token is missing! Ensure the user is logged in.");
      return;
    }

    // Pass form data to the parent component or context instead of making a POST request
    handleNewBlog({ title, author, url });

    // Reset form fields
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:{" "}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        Author:{" "}
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
      </div>
      <div>
        URL:{" "}
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlog;
