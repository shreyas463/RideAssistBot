/**
 * Ride model for the RideAssistBot application.
 */

// Ride status constants
export const RideStatus = {
  SCHEDULED: 0,
  DRIVER_ASSIGNED: 1,
  DRIVER_ARRIVING: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  CANCELLED: 5
};

/**
 * Get a text representation of a ride status
 * 
 * @param {number} status - The ride status code
 * @returns {string} Human-readable status text
 */
export function getRideStatusText(status) {
  switch (status) {
    case RideStatus.SCHEDULED:
      return 'Scheduled';
    case RideStatus.DRIVER_ASSIGNED:
      return 'Driver Assigned';
    case RideStatus.DRIVER_ARRIVING:
      return 'Driver is on the way';
    case RideStatus.IN_PROGRESS:
      return 'In Progress';
    case RideStatus.COMPLETED:
      return 'Completed';
    case RideStatus.CANCELLED:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
}

/**
 * Create a new driver object
 * 
 * @param {string} id - Driver ID
 * @param {string} name - Driver name
 * @param {string} phoneNumber - Driver phone number
 * @param {string} vehicleModel - Vehicle model
 * @param {string} licensePlate - License plate
 * @param {number} rating - Driver rating (0-5)
 * @returns {Object} A new driver object
 */
export function createDriver(id, name, phoneNumber, vehicleModel, licensePlate, rating) {
  return {
    id,
    name,
    phoneNumber,
    vehicleModel,
    licensePlate,
    rating,
    photoUrl: null
  };
}

/**
 * Create a new ride object
 * 
 * @param {string} id - Ride ID
 * @param {string} pickupLocation - Pickup location
 * @param {string} dropoffLocation - Dropoff location
 * @param {Date} scheduledTime - Scheduled pickup time
 * @param {number} status - Ride status (from RideStatus enum)
 * @param {Object} driver - Driver object
 * @param {string} userId - User ID
 * @returns {Object} A new ride object
 */
export function createRide(id, pickupLocation, dropoffLocation, scheduledTime, status, driver, userId) {
  return {
    id,
    pickupLocation,
    dropoffLocation,
    scheduledTime,
    actualPickupTime: null,
    completionTime: null,
    fare: 0,
    status,
    driver,
    userId,
    cancellationReason: null
  };
} 