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

// db.run('CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, email STRING)');
// db.run('CREATE TABLE bookings(id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, phone STRING, email STRING, date STRING, time STRING, user_id INTEGER)');
// db.run('ALTER TABLE bookings RENAME COLUMN date TO from_date;');
// db.run('ALTER TABLE bookings ADD COLUMN service STRING');

knex('bookings')
.select('*')
// .where('email', 'bharathsaravananofficial@gmail.com')
// .andWhere('service', 'wedding')
.then((tudoItems) => console.log({tudoItems}))