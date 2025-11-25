import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase.js";

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
    return res.status(401).json({ error: "Invalid token", details: e.message });
  }
}
