import "express";

/**
 * Extends the Express Request interface to include a `user` object.
 * This is typically populated by authentication middleware.
 *
 * @global
 * @namespace Express
 * @interface Request
 * @property {Object} [user] - Authenticated user information, if available.
 * @property {string} user.uid - Unique identifier of the authenticated user.
 * @property {string} [user.email] - User's email address.
 * @property {string} [user.name] - User's display name.
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        name?: string;
      };
    }
  }
}
