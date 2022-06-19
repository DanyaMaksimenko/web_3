var express = require("express")
var app = express()
const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('users.db'), {fileMustExist: true});
const usersRouter = require('./routes/users');
var cors = require('cors')
var corsOptions = {
    origin: 'http://127.0.0.1:5502/',
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
  }
app.use(cors(corsOptions))

app.use(express.json());
app.use('/users', usersRouter);

var HTTP_PORT = 8000 

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", (req, res, next) => {
    const row = db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
    console.log(row.name, row.sex, row.email, row.password);
    res.json({"message":"Ok"})
});


app.use(function(req, res){
    res.status(404);
});

