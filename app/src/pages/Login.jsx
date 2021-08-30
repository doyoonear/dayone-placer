import styled from 'styled-components';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

import { setStorage } from '../common/support/storage';
import authSignIn from '../common/api/auth';
import { SOCKET_EVENT_TYPE } from '../common/policy';
import socketConnection from '../common/api/socket';

function Login() {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const signIn = async () => {
    try {
      const result = await authSignIn(form);

      if (result.data.accessToken) {
        const accessToken = result?.data?.accessToken;
        setStorage('ACCESS_TOKEN', accessToken);

        socketConnection.emit(SOCKET_EVENT_TYPE.INIT, { accessToken });

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
