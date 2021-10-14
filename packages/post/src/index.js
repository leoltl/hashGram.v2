'use strict';

module.exports = post;

const app = require("express")();

function post() {
    app.listen("3001", () => {
        console.log('server listing')
    });
}

post();
