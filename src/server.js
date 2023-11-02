const express = require('express');
const connectToPostgres = require('./config/database');
const bodyParser = require('body-parser');
const config = require('./config/config');
const route = require('./routes/index');

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Your routes here
app.use('/api', route);

// Connect to database
config.db.postgres.client = connectToPostgres();

app.listen(3000, () => console.log('Server running on port 3000'));
