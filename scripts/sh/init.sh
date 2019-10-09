# This will run as a Docker ENTRYPOINT aka gets run after mongo starts

# Docker command
# docker exec jobBoardsDB mongo jobBoards /app/create-user.js -u root -p root --authenticationDatabase admin

# Mongo command
# user and password are based from the docker-compose.yml
mongo jobBoards /app/create-user.js -u root -p root --authenticationDatabase admin
