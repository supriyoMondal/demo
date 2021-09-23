import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({ register, addErrorMessage, switchForm }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, mobile, password, confirmPassword, name } = formData;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !mobile || !password || !confirmPassword || !name) {
      addErrorMessage('All fields are required!');
      return;
    }
    if (confirmPassword !== password) {
      addErrorMessage('Password dont match');
      return;
    }
    if (mobile.length !== 10) {
      addErrorMessage('Please enter a valid number');
      return;
    }
    setBtnLoading(true);
    await register({ email, mobile, name, password });
    setBtnLoading(false);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='form-container'>
      <h1 className='text-center'>Register Form</h1>
      <form onSubmit={handleRegister}>
        <div className='mt-2'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            name='name'
            onChange={handleInputChange}
            value={name}
            className='form-control'
            required
            placeholder='Jhon Doe'
          />
        </div>
        <div className='mt-2'>
          <label className='form-label'>Email</label>
          <input
            type='email'
            name='email'
            required
            onChange={handleInputChange}
            value={email}
            className='form-control'
            placeholder='name@example.com'
          />
        </div>
        <div className='mt-2'>
          <label className='form-label'>Mobile no</label>
          <input
            name='mobile'
            required
            onChange={(e) => {
              // allow numbers only
              const asciCode = e.target.value.charCodeAt(
                e.target.value.length - 1
              );
              if (
                (asciCode >= 48 && asciCode <= 57) ||
                e.target.value.length === 0
              ) {
                handleInputChange(e);
              }
            }}
            value={mobile}
            className='form-control'
            placeholder='9874563210'
          />
        </div>
        <div className='mt-2'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            name='password'
            onChange={handleInputChange}
            value={password}
            className='form-control'
            placeholder='**********'
            required
          />
        </div>
        <div className='mt-2'>
          <label className='form-label'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            onChange={handleInputChange}
            value={confirmPassword}
            className='form-control'
            placeholder='**********'
            required
          />
        </div>
        <button
          type='submit'
          disabled={btnLoading}
          className='btn btn-primary mt-4 w-100'
        >
          Register
        </button>
      </form>
      <h5 className='mt-2 mb-0 text-center '>OR</h5>
      <button
        onClick={switchForm}
        className='btn btn-outline-primary mt-2 mb-2 w-100'
      >
        Login
      </button>
    </div>
  );
};

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  addErrorMessage: PropTypes.func.isRequired,
  switchForm: PropTypes.func.isRequired,
};

export default RegisterForm;
