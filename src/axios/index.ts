import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_STACKS_BE_BASE_URL,
  timeout: 3000,
  withCredentials: true,
});

export interface User {
  id: string;
  firstname: string;
  lastname: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  stackOrder: string[];
  createdAt: string;
  updatedAt: string;
}

export async function fetchProjects() {
  return await httpClient.get<Project[]>('/projects');
}

export async function fetchProject(projectId: string) {
  return await httpClient.get<Project>(`/projects/${projectId}`);
}
