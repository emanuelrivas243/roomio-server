import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase.js";

/**
 * Express middleware that verifies a Firebase ID token sent in the
 * `Authorization` header using the format:
 *
 * **Authorization: Bearer <token>**
 *
 * After validation, it attaches the authenticated user's information to `req.user`.
 *
 * @async
 * @function verifyToken
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - Callback to pass control to the next middleware.
 *
 * @returns {void | Response} Sends a 401 response if the token is missing or invalid.
 *
 * @description
 * - Validates the presence of an authorization header.
 * - Extracts and verifies the Firebase ID token.
 * - Populates `req.user` with `uid`, `email`, and `name` from the decoded token.
 * - Calls `next()` on successful authentication.
 */
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1];
    const decoded = await auth.verifyIdToken(token);

    (req as any).user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name
    };

    next();

  } catch (e: any) {
    return res.status(401).json({
      error: "Invalid token",
      details: e.message
    });
  }
}
