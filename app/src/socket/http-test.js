import { useState, useEffect } from 'react';
import axios from 'axios';

const HttpTest = () => {
  const [rooms, setRooms] = useState([]);
  const [members, setMembers] = useState([]);

  const findRooms = async () => {
    const rooms = await axios.get('http://localhost:4000/rooms');
    console.log('rooms', rooms);
    setRooms(rooms.data);
  };

  const findMembers = async () => {
    const members = await axios.get('http://localhost:4000/members');
    console.log('members', members);
    setMembers(members.data);
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
      <button onClick={findRooms}>findRooms</button>
      <br />
      rooms: {JSON.stringify(rooms)}
      <br />
      <br />
      <button onClick={findMembers}>findMembers</button>
      members: {JSON.stringify(members)}
      <br />
      <br />
      <button onClick={signIn}>login</button>
    </div>
  );
};

export default HttpTest;
