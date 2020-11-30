const express = require('express');
const app = express();
const path = require("path");

const bodyParser = require('body-parser');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// pug
app.set('view engine', 'pug');
app.set('views','./views');

// router
const router = require('./router/router.js');
const { route } = require('./router/router.js');
const port = 6080;

// Set static folder
// app.use(express.static('public'));
app.use('/',express.static(path.join(__dirname)));

function error404(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }
    console.log(error);
    next(error);
};

function error_server(error, req, res, next) {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,  
            message: error.message || 'Internal Server Error'
        }
    });
};

app.use('/', router, error404, error_server);


  
//    error handler middleware

  

app.listen(port, () => {console.table('Connect successfull port ' + port)});

