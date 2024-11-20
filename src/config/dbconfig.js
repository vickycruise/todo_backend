// dbConfig.mjs
import pkg from "pg"; // Import the default export
import "dotenv/config"; // Automatically loads environment variables from .env
import { Sequelize } from "sequelize";

const { Client } = pkg; // Destructure to get Client

let clientInstance = null;


export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Set to true for debugging queries
  }
);
const getClient = async () => {
  if (!clientInstance) {
    clientInstance = new Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });

    await clientInstance
      .connect()
      .then(() => console.log("Connected to PostgreSQL"))
      .catch((err) => console.error("Connection error", err.stack));
  }

  return clientInstance;
};
export default getClient;