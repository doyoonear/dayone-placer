import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { setStorage } from '../api/support';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const result = await axios.post('http://localhost:4000/auth/sign-in', {
      email,
      password,
    });

    if (result?.data?.accessToken) {
      const accessToken = result?.data?.accessToken;
      setStorage('ACCESS_TOKEN', accessToken);
    }
  };

  return (
    <div>
      LOGIN
      <div>
        <div>
          <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type='button' onClick={signIn}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
