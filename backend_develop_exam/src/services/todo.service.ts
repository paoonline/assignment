import { Request, Response } from "express";
import { Todo, todos } from "../models/todo.model";

let nextId = 1;

export const getTodos = (_: Request, response: Response): Response<{data:Todo}[]> => {
  return response.json({data: todos});
};

export const createTodo = (request: Request<{}, {}, { title: string }>, response: Response): Response<{data:Todo}>  => {
  const { title } = request.body;

  if (!title) {
    return response.status(400).json({ message: "Title is required" });
  }

  const todo: Todo = { id: nextId++, title, success: false };
  todos.push(todo);

  return response.status(201).json({data: todo});
};

export const updateTodoById = (request: Request<{ id: string }, {}, { title?: string; success?: boolean }>, response: Response): Response<{data:Todo}>  => {
  const id = parseInt(request.params.id, 10);
  const { title, success } = request.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return response.status(404).json({ message: "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (success !== undefined) todo.success = success;

  return response.json({data: todo});
};

export const deleteTodoById = (request: Request<{ id: string }>, res: Response): Response<{data:Todo}> => {
  const id = parseInt(request.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  todos.splice(index, 1);
  return res.status(204).send();
};
