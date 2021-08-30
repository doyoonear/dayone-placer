import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import httpClient from '../api/http-client';
import Input from '../components/Input';
import Button from '../components/Button';

import { getStorage, setStorage } from '../api/support';

function Login() {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // useEffect(() => history.push(getStorage('ACCESS_TOKEN') ? '/' : '/login'), []);

  const signIn = async () => {
    try {
      const result = await httpClient.post({
        url: '/auth/sign-in',
        data: {
          ...form,
        },
      });

      if (result.data.accessToken) {
        const accessToken = result?.data?.accessToken;
        setStorage('ACCESS_TOKEN', accessToken);

        history.push('/');
      }
    } catch (e) {
      if (e.response.status === 401) {
        alert(e.response.data.message);
      }
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <LoginPage>
      <LoginContainer>
        <Title>LOGIN</Title>
        <form action={signIn}>
          <Input name='email' type='email' placeholder='email' value={form.email} onChange={handleForm} required />
          <Input
            name='password'
            type='password'
            placeholder='password'
            value={form.password}
            onChange={handleForm}
            required
          />
          <Button type='submit' onClick={signIn} name='로그인' />
        </form>
      </LoginContainer>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginContainer = styled.div`
  flex-direction: column;
  width: 300px;
`;

const Title = styled.p`
  margin: 100px 0 20px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export default Login;
