'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import EditProfile from '../EditProfile';
import EditTeacherInfo from './EditTeacherInfo';
import MyClass from './MyClass';

type TeacherTabComponent = {
  [key: string]: React.ReactNode;
};

const TeacherMyPageTab = () => {
  const router = useRouter();

  const [activePage, setActivePage] = useState('editProfile');

  const activeTeacherMyPageTab: TeacherTabComponent = {
    editProfile: <EditProfile />,
    editTeacherInfo: <EditTeacherInfo />,
    myClass: <MyClass />
  };

  // useEffect(() => {
  //   // 페이지 로드 시 쿼리 매개변수에서 teacherMypage 값을 읽어 활성 페이지를 설정합니다.
  //   const { teacherMypage } = router.query;
  //   if (teacherMypage && Object.keys(activeTeacherMyPageTab).includes(teacherMypage as string)) {
  //     setActivePage(teacherMypage as string);
  //   }
  // }, [router.query]);

  const handleOnClickTabBtn = (tab: string) => {
    setActivePage(tab);
    router.push(`/mypage?teacherMypage=${tab}`);
  };

  return (
    <div className="m-4 p-4">
      <div className="gap-4 flex flex-col">
        <div className="flex flex-row justify-items-start">
          <p
            onClick={() => handleOnClickTabBtn('editProfile')}
            className={`p-4 m-4 ${activePage === 'editProfile' ? 'font-bold cursor-pointer text-point-color' : ''}`}
          >
            프로필 수정하기
          </p>
          <p
            onClick={() => handleOnClickTabBtn('editTeacherInfo')}
            className={`p-4 m-4 ${activePage === 'editTeacherInfo' ? 'font-bold cursor-pointer text-point-color' : ''}`}
          >
            선생님 정보 수정하기
          </p>
          <p
            onClick={() => handleOnClickTabBtn('myClass')}
            className={`p-4 m-4 ${activePage === 'myClass' ? 'font-bold cursor-pointer text-point-color' : ''}`}
          >
            내가 등록한 클래스
          </p>
        </div>
        <div className="m-4 p-4">{activeTeacherMyPageTab[activePage]}</div>
      </div>
    </div>
  );
};

export default TeacherMyPageTab;
