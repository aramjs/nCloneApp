import express from "express";
import cors from "cors";
import linkRoutes from "./src/routes/linkRoutes";
import voteRoutes from "./src/routes/voteRoutes";
import commentRoutes from "./src/routes/commentRoutes";
import { checkUsername } from "./src/middlewares";

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // This will allow all origins. You can configure it further if needed.
app.use(checkUsername);

app.use("/api/links", linkRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
