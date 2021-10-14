'use strict';

module.exports = user;

const app = require("express")();

function user() {
    app.listen("3002", () => {
        console.log('server listing')
    });
}

user();