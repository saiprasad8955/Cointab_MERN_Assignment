const express = require('express')
const router = express.Router();
const { insertDataFromApi, getUserDetails, deleteAllusers } = require('../controllers/controller')


// Create a POST route at /api/users/insert for inserting user data into the database
router.post('/api/users/insert', insertDataFromApi);

// Create a GET route at /api/users to retrieve user data from the database
router.delete('/api/users/delete-all', deleteAllusers);

// Create a GET route at /api/users to retrieve user data from the database
router.get('/api/getUsers', getUserDetails);


module.exports = router;