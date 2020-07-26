## Node Job Boards

Small side jobs board project to get more familiar with the following

- GraphQL
- MongoDB
- Docker

The MongoDB is in a Docker container so that needs to be run first.

```
docker-compose up
```

Since I have Node on my local machine, I didn't create a container for Node. Therefore, in a separate tab, run Node

```
yarn && yarn start
```

By running Yarn, it will insert seed data into MongoDB and start the Node server. 

The server is on http://localhost:9000

The GraphQL is on http://localhost:9000/graphql
