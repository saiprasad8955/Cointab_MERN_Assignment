import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import '../styles/style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Homepage = () => {

    const [fetchLoading, setfetchLoading] = useState(false);
    const [deleteLoading, setdeleteLoading] = useState(false);


    const handleFetchUsers = async () => {
        setfetchLoading(true);
        try {
            // fetch 50 results from the API
            const { data } = await axios.get('https://randomuser.me/api/?results=50');

            // get the user data from the API response
            const users = data.results;

            // the API endpoint for inserting user data
            const insertUsersEndpoint = '/api/users/insert';

            // // insert the user data into the database
            await axios.post(insertUsersEndpoint, users);

            setfetchLoading(false); //For Ongoing fetching 

            // POP UP for Success
            Swal.fire('Users fetched and inserted into the database Successfully.')

        } catch (err) {
            console.error(err);
            setfetchLoading(false);
            Swal.fire('Error fetching or inserting users into the database.')
        }
    };

    const handleDeleteUsers = async () => {

        // Sweet alert for confirming deleting all Users 
        Swal.fire({
            title: 'Do you want to delete all the users?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setdeleteLoading(true);
                axios.delete('/api/users/delete-all').then(() => {
                    setdeleteLoading(false);
                    Swal.fire('Deleted!', '', 'success')
                }).catch((err) => {
                    console.error(err);
                    setdeleteLoading(false);
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

        // 

    }

    return (
        <>
            <Container className="home-page-container">
                <h1 className="home-page-title">Welcome to my Home Page!</h1>
                <div className="home-page-btn-row">
                    <Button onClick={handleFetchUsers} disabled={fetchLoading} className="home-page-btn" variant="primary">
                        {fetchLoading ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Fetch Users'}
                    </Button>
                    <Button onClick={handleDeleteUsers} disabled={deleteLoading} className="home-page-btn" variant="primary" >
                        {deleteLoading ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Delete Users'}
                    </Button>
                    <button className="home-page-btn" variant="primary" >
                        <Link to="/user-details" className="link">
                            Users Details
                        </Link>
                    </button>
                </div>
            </Container>
        </>
    )
}

export default Homepage;