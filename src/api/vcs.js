import { http } from "./http";

export async function signup({ email, username, password }) {
  const { data } = await http.post("/signup", { email, username, password });
  return data;
}

export async function login({ email, password }) {
  const { data } = await http.post("/login", { email, password });
  return data;
}

export async function getUserProfile(userId) {
  const { data } = await http.get(`/userProfile/${userId}`);
  return data;
}

export async function getAllRepositories() {
  const { data } = await http.get("/repo/all");
  return data;
}

export async function getRepositoriesForUser(userId) {
  const { data } = await http.get(`/repo/user/${userId}`);
  return data;
}

export async function createRepository({
  owner,
  name,
  description,
  visibility,
  content = [],
  issues = [],
}) {
  const { data } = await http.post("/repo/create", {
    owner,
    name,
    description,
    visibility,
    content,
    issues,
  });
  return data;
}

