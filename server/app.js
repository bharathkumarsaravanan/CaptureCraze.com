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

app.post("/:mail/booking", function(req,res) {
    var id = req.params.mail;
    var bookingDet = req.body;
    

    knex.insert({
        user_id: id,
        name: bookingDet.name,
        phone: bookingDet.phone,
        email: bookingDet.mail,
        from_date: bookingDet.from_date,
        to_date: bookingDet.to_date,
        service: bookingDet.service
    }).into('bookings').then(function() {
        console.log(`User with id ${id} booked.`);
        res.status(200).send('Response 2');
    }).catch(function(error) {
        res.status(500).send('oops');  
        console.log('error', error);  
    })
})

app.post("/:mail/booking/data", function(req,res) {
    var id = req.params.mail;
    var service = req.body.service;
    knex('bookings').select('*').where('email', id).andWhere('service', service).then(function(data) {
        console.log(data);
        res.status(200).send(data);
    }).catch(function(error) {
        res.status(500).send('oops');  
        console.log('error', error);  
    })
})

app.post("/:mail/booking/data/delete", function(req,res) {
    var id = req.params.mail;
    var service = req.body.service;
    console.log(id, service);
    
    knex('bookings')
    .where('email', id)
    .andWhere('service', service)
    .del()
    .then(function() {
        console.log(`Deleted booking for email ${id} and service ${service}`);
        res.status(200).send('Deleted successfully');
    })
    .catch(function(error) {
        res.status(500).send('oops');  
        console.log('error', error);  
    });
});

app.post("/:mail/booking/data/update", function(req,res) {
    var id = req.params.mail;
    var service = req.body.service;
    var bookingDet = req.body;
    knex('bookings')
    .where('email', id)
    .andWhere('service', service)
    .update({
        name: bookingDet.name,
        phone: bookingDet.phone,
        from_date: bookingDet.from_date,
        to_date: bookingDet.to_date
    })
    .then(function() {
        console.log(`Updated booking for email ${id} and service ${service}`);
        res.status(200).send('Updated successfully');
    })
    .catch(function(error) {
        res.status(500).send('oops');  
        console.log('error', error);  
    });
});

app.listen(4000,function(){
    console.log('localhost:4000');
})