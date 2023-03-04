const User = require('../models/userModel');
const { Op } = require('sequelize');

// Get User Details in the database
const getUserDetails = async (req, res) => {

    // Extract filters from query
    const { page, limit, filter } = req.query;

    // Set the default values for pagination and filtering options
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const filterValue = filter || "";

    try {

        // Retrieve users that match the filter value and count the total number of users
        const { rows, count } = await User.findAndCountAll({
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${filterValue}%` } },
                    { lastName: { [Op.like]: `%${filterValue}%` } },
                    { gender: { [Op.like]: `%${filterValue}%` } },
                    { city: { [Op.like]: `%${filterValue}%` } }
                ]
            },
            offset: (pageNumber - 1) * limitNumber,
            limit: limitNumber
        });

        const totalPages = Math.ceil(count / limitNumber);

        return res.status(200).json({ rows, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

// Insert Data from Random Api
const insertDataFromApi = async (req, res) => {

    try {

        // Fetch user data from API
        const users = req.body;

        // Map the data correctly as in Database
        const userData = users.map(result => ({
            firstName: result.name.first,
            lastName: result.name.last,
            gender: result.gender,
            city: result.location.city,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        // Create users in database
        await User.bulkCreate(userData);

        // Send response
        return res.status(201).json({ message: 'Users fetched and stored successfully.' });
    } catch (error) {
        console.error('Error inserting users into database:', error);
        res.status(500).send('Error inserting users into database.');
    }
};

// Deletes All Entries In Database
const deleteAllusers = async (req, res) => {

    try {
        // Deletes all rows in the table
        await User.destroy({ truncate: true }); // Deletes all rows in the table
        return res.status(204).end();
    } catch (error) {
        console.error('Error deleting users:', error);
    }
};

module.exports = { getUserDetails, insertDataFromApi, deleteAllusers }