import api from './api';

// ==========================================
// INVITATION SERVICES
// ==========================================

export const sendInvitation = async (invitationData) => {
  const response = await api.post('/invitations', invitationData);
  return response.data;
};

export const getInvitations = async (params = {}) => {
  const response = await api.get('/invitations', { params });
  return response.data;
};

export const acceptInvitation = async (invitationId) => {
  const response = await api.put(`/invitations/${invitationId}/accept`);
  return response.data;
};

export const rejectInvitation = async (invitationId) => {
  const response = await api.put(`/invitations/${invitationId}/reject`);
  return response.data;
};

// ==========================================
// TASK SERVICES
// ==========================================

export const createTask = async (projectId, taskData) => {
  const response = await api.post(`/projects/${projectId}/tasks`, taskData);
  return response.data;
};

export const getProjectTasks = async (projectId, params = {}) => {
  const response = await api.get(`/projects/${projectId}/tasks`, { params });
  return response.data;
};

export const getMyTasks = async () => {
  const response = await api.get('/tasks/my');
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

// ==========================================
// PROOF SERVICES
// ==========================================

export const submitProof = async (taskId, proofData) => {
  const response = await api.post(`/proofs/task/${taskId}`, proofData);
  return response.data;
};

export const getTaskProofs = async (taskId) => {
  const response = await api.get(`/proofs/task/${taskId}`);
  return response.data;
};

export const getProjectProofs = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/proofs`);
  return response.data;
};

export const reviewProof = async (proofId, reviewData) => {
  const response = await api.put(`/proofs/${proofId}/review`, reviewData);
  return response.data;
};

// ==========================================
// FACULTY FEEDBACK SERVICES
// ==========================================

export const addFacultyFeedback = async (projectId, feedbackData) => {
  const response = await api.post(`/projects/${projectId}/feedback`, feedbackData);
  return response.data;
};

export const getProjectFeedback = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/feedback`);
  return response.data;
};

export const updateFacultyFeedback = async (feedbackId, feedbackData) => {
  const response = await api.put(`/feedback/${feedbackId}`, feedbackData);
  return response.data;
};

// ==========================================
// CONTRIBUTION SERVICES
// ==========================================

export const getProjectContributions = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/contributions`);
  return response.data;
};

// ==========================================
// ACTIVITY LOG SERVICES
// ==========================================

export const getProjectActivities = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/activities`);
  return response.data;
};

// ==========================================
// USER / STUDENT DISCOVERY SERVICES
// ==========================================

export const getStudents = async (params = {}) => {
  const response = await api.get('/users/students', { params });
  return response.data;
};
