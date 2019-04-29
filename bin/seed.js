// bin/seed.js

const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

const dbName = 'celebrity';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrity = [
  {
    name: "Tom Cruise",
    occupation: "Actor",
    catchPrase: "Me apellido crucero",
  },
  {
    name: "Frank Sinatra",
    occupation: "Singer",
    catchPrase: "My way or the highway",
  },
  {
    name: "Madona",
    occupation: "Singer",
    catchPrase: "Like a virgin",
  }
]

Celebrity.create(celebrity, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${celebrity.length} celebrity`)
  mongoose.connection.close();
});