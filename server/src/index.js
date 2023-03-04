require('dotenv').config();
const express = require('express');
const route = require('./routes/routes')
const cors = require('cors')
const app = express();
const PORT = 5000;

// Parsing Data 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Imported DB 
require('./db/db');

// Imported Routes
app.use(cors());

// Imported routes
app.use('/', route);

// Start the server listening on port 3000
app.listen(PORT, () => {
  console.log(`Express App Started on https://localhost:${PORT}`);
});

