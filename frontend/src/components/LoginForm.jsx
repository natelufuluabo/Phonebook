/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import axios from 'axios';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErroMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);
      console.log(response.data);
      setErroMessage('');
      setFormData({
        username: '',
        password: '',
      });
    } catch (error) {
      setErroMessage(error.response.data.error);
      setFormData({
        username: formData.username,
        password: '',
      });
    }
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  return (
    <div className="container w-25 pt-5">
      <form onSubmit={handleSubmit}>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            type="text"
            id="username"
            className="form-control"
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="username">Username</label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className="form-control"
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="password">Password</label>
        </div>

        <div>
          <p className='text-danger'>{errorMessage}</p>
        </div>
        {/* <!-- 2 column grid layout for inline styling --> */}
        {/* <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <!-- Checkbox -->
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col">
            <!-- Simple link -->
            <a href="#!">Forgot password?</a>
          </div>
        </div> */}

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Sign in</button>

        {/* <!-- Register buttons --> */}
        {/* <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div> */}
      </form>
    </div>
  );
}
