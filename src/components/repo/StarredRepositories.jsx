import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../Navbar";
import "./repo.css";
import { getAllRepositories } from "../../api/vcs";

const StarredRepositories = () => {
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setError("");
        const data = await getAllRepositories();
        setRepos(Array.isArray(data) ? data : []);
      } catch (e) {
        setError("Could not load repositories. Is the backend running?");
      }
    };

    fetchRepos();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return repos;
    return repos.filter((r) => (r?.name || "").toLowerCase().includes(q));
  }, [query, repos]);

  return (
    <>
      <Navbar />
      <section className="repo-page">
        <div className="repo-card">
          <h2>Starred repositories</h2>

          <div className="repo-search">
            <input
              className="repo-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories..."
            />
          </div>

          {error ? <p className="repo-error">{error}</p> : null}

          <div className="repo-list">
            {filtered.map((repo) => (
              <div key={repo._id || repo.name} className="repo-list-item">
                <div className="repo-list-title">{repo.name}</div>
                {repo.description ? (
                  <div className="repo-list-desc">{repo.description}</div>
                ) : null}
              </div>
            ))}

            {!error && filtered.length === 0 ? (
              <p className="repo-hint">No repositories found.</p>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default StarredRepositories;

