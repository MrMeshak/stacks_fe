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
  stacks: Pick<Stack, 'id'>[];
}

export interface Stack {
  id: string;
  userId: string;
  projectId: string;
  title: string;
  color: string;
  taskOrder: string[];
  createAt: string;
  updatedAt: string;
  tasks: Omit<Task, 'subTasks'>[];
}

export interface Task {
  id: string;
  userId: string;
  stackId: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  status: string;
  startDate: string;
  dueDate: string;
  timeEstimate: string;
  subTaskOrder: string;
  createdAt: string;
  updatedAt: string;
}

export interface subTask {}

export async function fetchProjects() {
  return await httpClient.get<Project[]>('/projects');
}

export async function fetchProjectById(projectId: string) {
  return await httpClient.get<Project>(`/projects/${projectId}`);
}

export async function fetchStackById(stackId: string) {
  return await httpClient.get<Stack>(`/stacks/${stackId}`);
}
