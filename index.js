const http = require("node:http");
const dotenv = require('dotenv');
const app = require("./src/app");
const config = require("./src/config");
dotenv.config();

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send(JSON.stringify({
        statusCode: 500,
        message: "There is somthing wrong. Please try again after some time."
    }));
});

const server = http.createServer(app);
server.listen(config.port, () => console.log(`Server is running on port ${config.port}`));
