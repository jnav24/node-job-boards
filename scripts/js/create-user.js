db.createUser(
    {
        user: "job",
        pwd: "boards",
        roles: [
            { role: "readWrite", db: "jobBoards" }
        ]
    }
);
db.createCollection("test");
