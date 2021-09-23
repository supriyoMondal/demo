import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ login, addErrorMessage, switchForm }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addErrorMessage('All fields are required!');
      return;
    }
    setBtnLoading(true);
    await login({ email, password });
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
      <h1 className='text-center'>Login Form</h1>
      <form onSubmit={handleRegister}>
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
        <button
          type='submit'
          disabled={btnLoading}
          className='btn btn-primary mt-4 w-100'
        >
          Login
        </button>
      </form>
      <h5 className='mt-2 mb-0 text-center '>OR</h5>
      <button
        onClick={switchForm}
        className='btn btn-outline-primary mt-2 mb-2 w-100'
      >
        Register
      </button>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  addErrorMessage: PropTypes.func.isRequired,
  switchForm: PropTypes.func.isRequired,
};

export default LoginForm;
