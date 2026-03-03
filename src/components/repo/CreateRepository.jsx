import React, { useMemo, useState } from "react";
import Navbar from "../Navbar";
import "./repo.css";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");

  const isValid = useMemo(() => name.trim().length > 0, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only page: backend endpoint is project-specific.
    alert("UI is ready. Hook this form to your backend create-repo endpoint.");
  };

  return (
    <>
      <Navbar />
      <section className="repo-page">
        <div className="repo-card">
          <h2>Create a new repository</h2>

          <form className="repo-form" onSubmit={handleSubmit}>
            <label className="repo-label">
              Repository name
              <input
                className="repo-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-awesome-project"
              />
            </label>

            <label className="repo-label">
              Description (optional)
              <input
                className="repo-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this repository about?"
              />
            </label>

            <div className="repo-radio-row">
              <label className="repo-radio">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                />
                Public
              </label>

              <label className="repo-radio">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                />
                Private
              </label>
            </div>

            <button className="repo-button" disabled={!isValid} type="submit">
              Create repository
            </button>
          </form>

          <p className="repo-hint">
            Note: this page fixes the broken route. Connect the submit handler
            to your backend when ready.
          </p>
        </div>
      </section>
    </>
  );
};

export default CreateRepository;

