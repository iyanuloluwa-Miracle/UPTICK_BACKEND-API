const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const route = require('./routes/index');
const { sequelize } = require('./models');

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Your routes here
app.use('/api', route);

const port = config.port || 3000;

// Check database connection and start app
sequelize.authenticate()
.then(() => {
  console.log('db connected');

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((error) => console.log(`error connecting: ${error}`));

