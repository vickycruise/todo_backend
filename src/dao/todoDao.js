// dao/todoDao.mjs
import { v4 as uuidv4 } from "uuid";
import getClient from "../config/dbconfig.js";

let todos = [
  {
    id: uuidv4(),
    title: "vicky",
    description: "nothing",
    completed: false,
    createdAt: new Date(),
  },
];
const client = await getClient();
export const getAllTodos = async () => {
  const query = "select * from todos ";
  const result = await client.query(query);
  return result.rows;
};

export const getTodoById = async ({ id }) => {
  console.log(id, "ids");
  const query = "SELECT * FROM todos WHERE id = $1";
  const result = await client.query(query, [id]);
  // console.log(result.rows[0], "getid");
  return result.rows[0];
};
export const getTodoByUId = async ({ uid }) => {
  const query = "SELECT * FROM todos WHERE uid = $1";
  const result = await client.query(query, [uid]);
  return result.rows;
};

export const createTodo = async ({ uid, title, description = "", time }) => {
  const newTodo = {
    id: uuidv4(),
    title,
    description,
    uid,
    is_completed: false, // Ensure this is a boolean, not a string
    time,
  };

  const query = `
    INSERT INTO todos (id, title, description, uid, is_completed, created_at, updated_at, time)
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6)
    RETURNING *;
`;

  const values = [
    newTodo.id,
    newTodo.title,
    newTodo.description,
    newTodo.uid,
    newTodo.is_completed,
    newTodo.time,
  ];

  try {
    const result = await client.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error inserting todo:", error.stack);
    throw error;
  }

  return newTodo;
};

export const updateTodo = async (updates) => {
  const payload = JSON.parse(updates);
  const todo = await getTodoById({ id: payload.id });
  if (!todo) return null;
  const query = `
      UPDATE todos
      SET title = $1,
          description = $2,
          is_completed = $3,
          time = $4,
          updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;

  const values = [
    payload.title || todo.title,
    payload.description || todo.description,
    payload.is_completed ?? todo.is_completed,
    payload.time || todo.time,
    payload.id,
  ];

  const result = await client.query(query, values);
  return result;
};

export const deleteTodo = async (id) => {
  try {
    const query = "DELETE FROM todos WHERE id = $1";
    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting todo:", error.stack);
    throw error;
  }
  return true;
};
