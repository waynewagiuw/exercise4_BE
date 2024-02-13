const express = require('express');
const morgan = require('morgan');
const users = require('./users');
const app = express();
const currentDate = new Date().toISOString();


// GET: /users endpoint untuk memberikan list data users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// GET: /users/:name endpoint untuk memberikan data user sesuai permintaan client
app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = users.find(user => user.name.toLowerCase() === name);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "Data user tidak ditemukan" });
    }
});

app.get('/', (req, res) => {
    res.send('This is the home page of exercise 4');
});


// Middleware untuk log
const log = (req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.ip} ${req.originalUrl}`);
    next();
};
app.use(log);

// middleware menangani 404
const notFound = (req, res, next) =>{
    res.json({
        status: "error",
        message: "resource tidak ditemukan",
    })
}
app.use(notFound)

// Menangani error
const errorHandling = (err, req,res,next) => {
    res.json({
        status: "error",
        message: "terjadi kesalahan pada server"
    })
}
app.use(errorHandling)

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/` );
});