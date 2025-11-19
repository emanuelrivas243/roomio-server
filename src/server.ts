import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import meetingRoutes from "./routes/meetings.js";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/authMiddleware.js";


dotenv.config(); // ← Mover esto ANTES de usar process.env

const PORT = process.env.PORT || 5000;

const app = express();

// 1. CORS primero (ANTES de las rutas)
const allowedOrigins = [
  "http://localhost:5175",
  "https://roomio-frontend-71odq4upu-johanandrescts-projects.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (como Postman, mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// 2. JSON parser
app.use(express.json());

// 3. Rutas (DESPUÉS de CORS y JSON parser)
app.use("/auth", authRoutes);
app.use("/users", verifyToken, userRoutes);
app.use("/meetings", verifyToken, meetingRoutes);


app.get("/", (_, res) => res.send("Backend Sprint 1 funcionando"));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));