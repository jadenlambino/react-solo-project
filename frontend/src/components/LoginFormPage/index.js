import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoUser = (e) => {
    setCredential('Demo-lition')
    setPassword('password')
    e.submit();
  }

  return (
    <div className='login-container'>
      <form className='log-form' onSubmit={handleSubmit}>
        <ul className='log-error'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className='log-label'>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='log-label'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='log-button'>Log In</button>
        <button type="submit" onClick={demoUser} className='log-button'>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
