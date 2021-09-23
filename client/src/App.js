import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './components/Loading';
import './App.css';
import Dashboard from './components/Dashboard';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const TOKEN = 'token';
const API_URL = 'http://localhost:5000';
const App = () => {
  const [loading, setLoading] = useState(true);
  const [formType, setFromType] = useState(0);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState([]);

  const switchForm = () => {
    if (formType === 0) {
      setFromType(1);
    } else {
      setFromType(0);
    }
  };

  const handleErrors = (error) => {
    if (error.response?.data?.errors.length) {
      addErrorMessage(error.response.data?.errors[0].msg);
    }
  };

  const getUserData = async (token) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await axios.get(`${API_URL}/api/auth`, config);
      setUser(response.data);
    } catch (error) {
      handleErrors(error);
      localStorage.removeItem(token);
      setUser(null);
    }
  };

  const loadUser = async () => {
    setLoading(true);
    const token = localStorage.getItem(TOKEN);
    if (token) {
      await getUserData(token);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const registerUser = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/users`, data);
      localStorage.setItem(TOKEN, response.data.token);
      getUserData(response.data.token);
    } catch (error) {
      handleErrors(error);
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth`, data);
      localStorage.setItem(TOKEN, response.data.token);
      getUserData(response.data.token);
    } catch (error) {
      handleErrors(error);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem(TOKEN);
  };

  const addErrorMessage = (msg) => {
    const id = Math.floor(Math.random() * 100000).toString();
    setAlert([{ msg, type: 'danger', id }]);
    setTimeout(() => {
      setAlert((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  };
  const addSuccessMessage = (msg) => {
    const id = Math.floor(Math.random() * 100000).toString();
    setAlert([{ msg, type: 'success', id }]);
    setTimeout(() => {
      setAlert((prev) => prev.filter((item) => item.id !== id));
    }, 2000);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className='wrapper'>
      {/* {alert.map()} */}
      {alert.map(({ id, msg, type }) => (
        <div
          key={id}
          className={`alert alert-${type} custom-alert`}
          role='alert'
        >
          {msg}
        </div>
      ))}
      {loading ? (
        <Loading />
      ) : user ? (
        <Dashboard user={user} logout={logOut} />
      ) : formType === 0 ? (
        <RegisterForm
          register={registerUser}
          addErrorMessage={addErrorMessage}
          switchForm={switchForm}
        />
      ) : (
        <LoginForm
          login={loginUser}
          addErrorMessage={addErrorMessage}
          switchForm={switchForm}
        />
      )}
    </div>
  );
};

export default App;
