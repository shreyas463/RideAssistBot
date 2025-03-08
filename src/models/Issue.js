/**
 * Issue model for the RideAssistBot application.
 */

// Issue type constants
export const IssueType = {
  PAYMENT: 0,
  DRIVER_BEHAVIOR: 1,
  APP_PROBLEM: 2,
  OTHER: 3
};

// Issue status constants
export const IssueStatus = {
  SUBMITTED: 0,
  IN_REVIEW: 1,
  RESOLVED: 2
};

/**
 * Get a text representation of an issue type
 * 
 * @param {number} type - The issue type code
 * @returns {string} Human-readable type text
 */
export function getIssueTypeText(type) {
  switch (type) {
    case IssueType.PAYMENT:
      return 'Payment Issue';
    case IssueType.DRIVER_BEHAVIOR:
      return 'Driver Behavior';
    case IssueType.APP_PROBLEM:
      return 'App Problem';
    case IssueType.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
}

/**
 * Get a text representation of an issue status
 * 
 * @param {number} status - The issue status code
 * @returns {string} Human-readable status text
 */
export function getIssueStatusText(status) {
  switch (status) {
    case IssueStatus.SUBMITTED:
      return 'Submitted';
    case IssueStatus.IN_REVIEW:
      return 'In Review';
    case IssueStatus.RESOLVED:
      return 'Resolved';
    default:
      return 'Unknown';
  }
}

/**
 * Create a new issue object
 * 
 * @param {number} type - Issue type (from IssueType enum)
 * @param {string} description - Issue description
 * @param {string} userId - User ID
 * @param {string} rideId - Ride ID
 * @returns {Object} A new issue object
 */
export function createIssue(type, description, userId, rideId) {
  return {
    id: null, // Will be set by the server
    type,
    description,
    userId,
    rideId,
    submissionTime: new Date(),
    status: IssueStatus.SUBMITTED,
    resolutionNotes: null
  };
} 