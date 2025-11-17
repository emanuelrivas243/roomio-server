import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import meetingRoutes from "./routes/meetings.js";

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

app.get("/", (_, res) => res.send("Backend Sprint 1 funcionando"));

app.listen(5000, () => console.log("Servidor en puerto 5000"));
