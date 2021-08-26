import React, { useState } from 'react';
import httpClient from '../api/http-client';

const HttpTest = () => {
  const [rooms, setRooms] = useState([]);
  const [members, setMembers] = useState([]);

  const findRooms = async () => {
    const result = await httpClient.get({ url: `/rooms` });
    console.log('rooms', result);
    setRooms(result.data);
  };

  const findMembers = async () => {
    const result = await httpClient.get({ url: `/members` });
    console.log('members', result);
    setMembers(result.data);
  };

  const findGroups = async () => {
    const result = await httpClient.get({ url: `/groups` });
    console.log('groups', result);
  };

  const findDesks = async () => {
    const roomId = 1;
    const result = await httpClient.get({ url: `/desks/${roomId}` });
    console.log('desks', result);
  };

  const findParts = async () => {
    const roomId = 1;
    const result = await httpClient.get({ url: `/parts/${roomId}` });
    console.log('parts', result);
  };

  const findGroupMembers = async () => {
    const result = await httpClient.get({ url: `/members` });
    console.log('groups', result);
  };

  const signIn = async () => {
    const result = await httpClient.post({
      url: `/auth/sign-in`,
      data: {
        email: 'test',
        password: 'test',
      },
    });
  };

  return (
    <div>
      HTTP
      <br />
      <br />
      <button type='button' onClick={findRooms}>
        room 목록 (로그인 후 하단 탭 목록 가져오기)
      </button>
      <br />
      <br />
      <button type='button' onClick={findMembers}>
        임직원 목록 가져오기
      </button>
      <br />
      <br />
      <button type='button' onClick={findGroups}>
        그룹 (부서 목록) 불러오기
      </button>
      <br />
      <br />
      <button type='button' onClick={findGroupMembers}>
        그룹 + 임직원 불러오기
      </button>
      <br />
      <br />
      <button type='button' onClick={findDesks}>
        책상 목록 불러오기
      </button>
      <br />
      <br />
      <button type='button' onClick={findParts}>
        부품 (part) 목록 불러오기 (책상을 제외한 창문, 물건, 바닥 색상 등등이 여기 해당)
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
