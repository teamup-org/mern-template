import cors from "cors";
import express from "express";
import path from "path";
import connectDB from "./helpers/db";
import docRoutes from "./routes/doc";
import teacherRoutes from "./routes/teacher";
import userRoutes from "./routes/user";

const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
	await connectDB();
}

main().catch(console.error);

app.use(express.json());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/docs", docRoutes);
app.use("/api/teacher", teacherRoutes);

app.use(
	cors({
		origin: "http://localhost:8080", // replace with your frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"], // add the HTTP methods you're using
		allowedHeaders: ["Content-Type", "Authorization"], // add the headers you're using
	})
);
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "..")));

// Example of a simple API endpoint (order matters)
app.get("/api", (req, res) => {
	res.json({ message: "Hello, world!" });
});

// Fallback for SPA routing
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
