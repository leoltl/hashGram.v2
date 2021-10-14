import express from "express";
import { prisma } from "./database";

const app = express();
const PORT = 3002;

function user() {
    app.get('/', async (req, res) => {
        const result = prisma.user.findMany();
        console.log('result', result);
        res.send("hi from user")
    })
    app.listen(PORT, () => {
        console.log(`server listing at ${PORT}`);
    });
}

user();