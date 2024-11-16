#!/bin/bash

# Project root directory
BASE_DIR=$(pwd)
ROOT_DIR="$BASE_DIR/src"


# Folder structure
declare -A FOLDERS=(
    ["$ROOT_DIR/bin"]="www"
    ["$ROOT_DIR/config"]="config.js keys.js"
    ["$ROOT_DIR/controllers"]="userController.js taskController.js"
    ["$ROOT_DIR/middleware"]="authMiddleware.js loggerMiddleware.js"
    ["$ROOT_DIR/models"]="userModel.js taskModel.js"
    ["$ROOT_DIR/dao"]="userDao.js taskDao.js"
    ["$ROOT_DIR/routes"]="index.js users.js tasks.js"
    ["$ROOT_DIR/services"]="userService.js taskService.js"
    ["$ROOT_DIR/utils"]="logger.js errorHandler.js"
    ["$ROOT_DIR/public"]="images styles scripts"
    ["$ROOT_DIR/views"]="index.pug userProfile.pug"
)

# Create the directory structure and files
for DIR in "${!FOLDERS[@]}"; do
    mkdir -p "$DIR"
    # Create sample files inside the directory
    for FILE in ${FOLDERS[$DIR]}; do
        echo "// Sample file for $FILE" > "$DIR/$FILE"
    done
done

# Create .env and README.md
echo "NODE_ENV=development" > "$BASE_DIR/.env"
echo "# MyApp - Node.js Express App" > "$BASE_DIR/README.md"


# Done
echo "Project structure and files have been created successfully."
