import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ user, logout }) => {
  return (
    <div className='form-container'>
      <h2 className='text-center'>Dashboard</h2>

      <h4 className='mt-3'>name: {user.name}</h4>
      <h4 className=''>email: {user.email}</h4>
      <h4 className=''>mobile: {user.mobile}</h4>

      {/* Logout btn */}
      <button
        style={{ position: 'absolute', top: 0, right: 0 }}
        onClick={logout}
        className='btn btn-outline-primary'
      >
        Logout
      </button>
    </div>
  );
};

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
};
export default Dashboard;
