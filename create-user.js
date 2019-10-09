db.createUser(
    {
        user: "jobie",
        pwd: "boards",
        roles: [
            { role: "readWrite", db: "jobBoards" }
        ]
    }
);
db.createCollection("test");
