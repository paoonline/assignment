import express from "express";
import todoRoutes from "./routes/todo.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Todo API is running!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
