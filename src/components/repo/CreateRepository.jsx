import React, { useMemo, useState } from "react";
import Navbar from "../Navbar";
import "./repo.css";
import { createRepository } from "../../api/vcs";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = useMemo(() => name.trim().length > 0, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner = localStorage.getItem("userId");
    if (!owner) {
      setError("You must be logged in to create a repository.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await createRepository({
        owner,
        name: name.trim(),
        description: description.trim(),
        visibility: visibility === "public",
      });

      window.location.href = "/";
    } catch (e2) {
      const message =
        e2?.response?.data?.error ||
        e2?.response?.data?.message ||
        "Could not create repository.";
      setError(message);
    } finally {
      setLoading(false);
    }
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
              {loading ? "Creating..." : "Create repository"}
            </button>
          </form>

          {error ? <p className="repo-error">{error}</p> : null}
        </div>
      </section>
    </>
  );
};

export default CreateRepository;

