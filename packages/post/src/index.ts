import express from "express";

const app = express();
const PORT = 3001;

function user() {
    app.get('/', (req, res) => {
        res.send("hi from post")
    })
    app.listen(PORT, () => {
        console.log(`server listing at ${PORT}`)
    });
}

user();