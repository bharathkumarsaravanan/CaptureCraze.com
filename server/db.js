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

knex('users')
.select('*')
.then((tudoItems) => console.log({tudoItems}))