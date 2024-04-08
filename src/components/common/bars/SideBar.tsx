'use client';

import React, { PropsWithChildren } from 'react';
import Category from './categories/Category';
import Link from 'next/link';
import ConvertBtn from './ConvertBtn';
import { FiHome } from 'react-icons/fi';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { SlNote } from 'react-icons/sl';
import { GoPerson } from 'react-icons/go';
import { useLoginStore } from '@/store/login/LoginUserIdStore';

const SideBar = ({ children }: PropsWithChildren) => {
  const { loginUserId } = useLoginStore();
  return (
    <>
      <div className="fixed p-3 top-0 bg-[#5373FF]  bottom-0 flex flex-col justify-between items-center left-0 w-[100px] z-50">
        <div className="mt-[5vh] flex flex-col text-white items-center">
          <Link href={'/'} className="p-4  flex flex-col items-center">
            <FiHome size={30} />
            <span>HOME</span>
          </Link>
          <Link href={'/chat'} className="p-4 flex flex-col items-center">
            <IoChatbubbleEllipsesOutline size={30} />
            <span>CHAT</span>
          </Link>
          <Link href={'/register'} className="p-4 flex flex-col items-center">
            <SlNote size={30} />
            <span>CREATE</span>
          </Link>
          <Link href={'/mypage'} className="p-4 flex flex-col items-center">
            <GoPerson size={30} />
            <span>MYPAGE</span>
          </Link>
        </div>
        <div>
          {/* 수강생/강사 전환 버튼입니다. (로그인 상태일 때만 보임) */}
          {loginUserId && <ConvertBtn />}
        </div>
      </div>

      <div className="flex-1 ml-[100px]">{children}</div>
    </>
  );
};

export default SideBar;
