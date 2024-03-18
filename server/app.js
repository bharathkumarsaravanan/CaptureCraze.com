const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

const sqlite3 = require('sqlite3');
const path = require('path')
const db = new sqlite3.Database(path.resolve(__dirname,'./data.db'));


const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data.db'
    },
    useNullAsDefault: true
});


app.post("/signin", function(req, res) {
    console.log(req.body.mail);
    var email = req.body.mail;
    knex.insert({
        email: email
    }).into('users').then(function() {
        console.log(`User with mail ${email} signed in`);
        res.status(200).send('Response 1');
    }).catch(function(error) {
        res.status(500).send('oops');  
        console.log('error', error);  
    })
});

app.listen(4000,function(){
    console.log('localhost:4000');
})