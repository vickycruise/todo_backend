import getClient from "../config/dbconfig.js";

const checkForToDos = async () => {
  try {
    const client = await getClient();
    const query =
      "SELECT * FROM todos WHERE time > NOW()  and is_completed=false ORDER BY time ASC LIMIT 10";
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};
export default checkForToDos;
