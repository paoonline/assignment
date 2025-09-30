import { Router } from "express";
import { getTodos, createTodo, updateTodoById, deleteTodoById } from "../services/todo.service";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodoById);
router.delete("/:id", deleteTodoById);

export default router;
