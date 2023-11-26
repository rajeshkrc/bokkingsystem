let db = connect("mongodb://localhost:27017/admin");

db = db.getSiblingDB('bookingsystem'); // we can not use "use" statement here to switch db
db.createUser(
    {
        user: "root",
        pwd: "secret",
        roles: [ { role: "readWrite", db: "bookingsystem"} ],
        // passwordDigestor: "server",
    }
)