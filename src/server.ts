import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import meetingRoutes from "./routes/meetings";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

// Ruta de prueba
app.get("/", (req, res) => res.send("Backend Sprint 1 corriendo 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
