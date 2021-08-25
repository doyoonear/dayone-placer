import { useState, useEffect } from 'react';
import axios from 'axios';

const HttpTest = () => {
  const [rooms, setRooms] = useState([]);
  const [members, setMembers] = useState([]);

  const findRooms = async () => {
    const result = await axios.get('http://localhost:4000/rooms');
    console.log('rooms', result);
    setRooms(result.data);
  };

  const findMembers = async () => {
    const result = await axios.get('http://localhost:4000/members');
    console.log('members', result);
    setMembers(result.data);
  };

  const signIn = async () => {
    const result = await axios.post('http://localhost:4000/auth/sign-in', {
      email: 'test',
      password: 'test',
    });
  };

  return (
    <div>
      HTTP
      <button type='button' onClick={findRooms}>
        findRooms
      </button>
      <br />
      <br />
      <br />
      <button type='button' onClick={findMembers}>
        findMembers
      </button>
      <br />
      <br />
      <button type='button' onClick={signIn}>
        login
      </button>
    </div>
  );
};

export default HttpTest;
