import api from './api';

/**
 * Fetch all available projects
 */
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

/**
 * Fetch single project by ID
 */
export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

/**
 * Create a new project (Leader only)
 */
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

/**
 * Get skill match for authenticated student against a project
 */
export const getProjectMatch = async (id) => {
  const response = await api.get(`/projects/${id}/match`);
  return response.data;
};

