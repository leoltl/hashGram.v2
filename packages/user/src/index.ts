import express from "express";

const app = express();
const PORT = 3002;

function user() {
    app.get('/', (req, res) => {
        res.send("hi from user")
    })
    app.listen(PORT, () => {
        console.log(`server listing at ${PORT}`);
    });
}

user();