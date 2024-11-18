// routes/todoRoutes.mjs
import express from "express";
import { check, validationResult } from "express-validator";
import {
  addTodo,
  fetchAllTodos,
  fetchTodoById,
  fetchTodoByUId,
  modifyTodo,
  removeTodo,
} from "../controllers/todoController.js";

const todoRoutes = express.Router();

// Validation middleware for request body and params
const validateTodo = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateTodoId = [
  check("id").isUUID().withMessage("Invalid To-Do ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define routes
// todoRoutes.get("/", fetchAllTodos); // GET /todos
// todoRoutes.get("/id/:id", validateTodoId, fetchTodoById);
todoRoutes.get("/", (req, res) => {
  const uid = req.query.uid;
  const id = req.query.id;
  if (id) {
    fetchTodoById(req, res);
  } else if (uid) {
    fetchTodoByUId(req, res);
  } else {
    fetchAllTodos(req, res);
  }
});
todoRoutes.post("/", addTodo);
todoRoutes.put("/update", modifyTodo);
todoRoutes.delete("/:id", validateTodoId, removeTodo);

export default todoRoutes;
