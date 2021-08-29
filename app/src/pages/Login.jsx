import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import httpClient from '../api/http-client';

import { setStorage } from '../api/support';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const result = await httpClient.post({
        url: '/auth/sign-in',
        data: {
          email,
          password,
        },
      });

      if (result.data.accessToken) {
        const accessToken = result?.data?.accessToken;
        setStorage('ACCESS_TOKEN', accessToken);

        // TODO: 페이지 이동
        alert('로그인 완료');
      }
    } catch (e) {
      if (e.response.status === 401) {
        alert(e.response.data.message);
      }
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
