import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import meetingRoutes from "./routes/meetings.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

// rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

app.get("/", (_, res) => res.send("Backend Sprint 1 funcionando"));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
