const path = require("path");
const fs = require('fs');
const { gunzipSync } = require("zlib");

module.exports.main = (rep,res,next) => { 
    res.render('read');
}

module.exports.read = async (req,res,next) => {
    try {
        let content = fs.readFileSync(req.body.path,{encoding: 'utf-8'});
        res.send(content);
    } catch (error) {
        next(error);
    }
}

module.exports.content = async (req,res,next) => {
    let content = res.body.content;
    res.send(content);
}