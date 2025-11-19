/**
 * @file Server entry point for the Roomio backend.
 * Initializes Express, CORS, environment variables, middleware, and routes.
 */

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import meetingRoutes from "./routes/meetings.js";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/authMiddleware.js";

// Load environment variables BEFORE accessing process.env
dotenv.config();

/**
 * The port where the server will listen.
 * Defaults to 5000 if PORT is not defined in environment variables.
 * @type {number|string}
 */
const PORT = process.env.PORT || 5000;

const app = express();

/**
 * List of allowed origins for CORS.
 * Only requests coming from these origins will be accepted.
 * @type {string[]}
 */
const allowedOrigins = [
  "http://localhost:5175",
  "https://roomio-frontend-71odq4upu-johanandrescts-projects.vercel.app",
  process.env.FRONTEND_URL
];

/**
 * Global CORS middleware configuration.
 * Ensures only approved origins can access the API.
 */
app.use(cors({
  /**
   * Custom origin validation.
   * @param {string|null} origin - Origin of the HTTP request.
   * @param {(err: Error|null, allowed?: boolean) => void} callback - Callback indicating whether to allow the request.
   */
  origin: (origin, callback) => {
    // Allow requests without an origin (Postman, mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Authentication routes.
 * Handles register/login and token generation.
 * No authentication required.
 */
app.use("/auth", authRoutes);

/**
 * User routes.
 * Protected with verifyToken middleware.
 */
app.use("/users", verifyToken, userRoutes);

/**
 * Meeting routes.
 * Protected with verifyToken middleware.
 */
app.use("/meetings", verifyToken, meetingRoutes);

/**
 * Root endpoint.
 * Used for health checks and quick server validation.
 */
app.get("/", (_, res) => res.send("Backend Sprint 1 funcionando"));

/**
 * Starts the HTTP server on the defined port.
 */
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
