// controllers/todoController.mjs
import getClient from "../config/dbconfig.js";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoByUId,
} from "../dao/todoDao.js";

export const fetchAllTodos = async (req, res) => {
  const todos = await getAllTodos();

  res.status(200).json(todos);
};

export const fetchTodoById = (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).json({ message: "id is required" });
  }
  try {
    const todo = getTodoById({ id });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "To-Do item not found" });
    }
  } catch (error) {
    console.error("Error fetching todo:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the To-Do item" }); // Handle server errors
  }
};
export const fetchTodoByUId = async (req, res) => {
  const uid = req.query.uid;

  if (!uid) {
    return res.status(400).json({ message: "UID is required" }); // Return early to prevent further execution
  }

  try {
    const todo = await getTodoByUId({ uid }); // Assuming getTodoByUId is async

    if (todo) {
      return res.status(200).json(todo); // Send the todo if found
    } else {
      return res.status(404).json({ message: "To-Do item not found" }); // Return 404 if not found
    }
  } catch (error) {
    console.error("Error fetching todo:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the To-Do item" }); // Handle server errors
  }
};

export const addTodo = async (req, res) => {
  const { title, description, uid, time } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo = await createTodo({ title, description, uid, time });

  res.status(201).json(newTodo);
};

export const modifyTodo = (req, res) => {
  const updates = req.body.data;
  // console.log(updates.data, "updates");
  const updatedTodo = updateTodo(updates);

  if (updatedTodo) {
    res.status(200).json(updatedTodo);
  } else {
    res.status(404).json({ message: "To-Do item not found" });
  }
};

export const removeTodo = (req, res) => {
  const success = deleteTodo(req.params.id);

  if (success) {
    res.status(200).json({ message: "successfuly removedS" });
  } else {
    res.status(404).json({ message: "To-Do item not found" });
  }
};
