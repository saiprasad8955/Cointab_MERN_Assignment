import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "../styles/tableStyle.css"
import { Link } from 'react-router-dom';

const UserDetails = () => {

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {

    // Fetch users with pagination and filtering options
    const fetchUsers = async () => {
      const response = await axios.get(`/api/getUsers?page=${currentPage}&filter=${filter}`);
      setUsers(response.data.rows);
      setTotalPages(response.data.totalPages);
    };

    fetchUsers();
  }, [currentPage, filter]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div className="container">
        <h1 className="heading">User Details</h1>
      </div>

      <div className='pull-right '>
        <input type="text" className="search-input " placeholder='Search any of values..' value={filter} onChange={handleFilterChange} />
      </div>

      {
        users.length ?
          (
            <table className='table'>
              <thead>
                <tr>
                  <th>S No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName.toUpperCase()}</td>
                    <td>{user.lastName.toUpperCase()}</td>
                    <td>{user.gender.toUpperCase()}</td>
                    <td>{user.city.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table >
          ) : (
            <div className="error-container">
              <h1 className="error-heading">NO Data is available!! Please Add from Below.</h1>
              <button className="home-page-btn" variant="primary" >
                <Link to="/" className="link" >Please Click Here to Add Data.</Link>
              </button>
            </div>
          )
      }
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  )
};

export default UserDetails;