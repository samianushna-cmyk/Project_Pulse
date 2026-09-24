import ActivityLog from '../models/ActivityLog.js';

/**
 * Helper to record project activity logs safely without breaking caller requests
 *
 * @param {string|ObjectId} projectId
 * @param {string|ObjectId} userId
 * @param {string} action
 * @param {string} description
 */
export const logActivity = async (projectId, userId, action, description) => {
  try {
    if (!projectId || !userId || !action || !description) return;
    await ActivityLog.create({
      project: projectId,
      user: userId,
      action: action.trim(),
      description: description.trim(),
    });
  } catch (error) {
    console.error('[ProjectPulse Activity Log Error]:', error.message);
  }
};

export default logActivity;
