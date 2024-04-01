'use client';

import React, { useEffect } from 'react';
import ClassCard from './ClassCard';
import { useClassInfoStore } from '@/store/ClassInfoStore';
import { getClassAllInfo } from '@/app/api/supabase/fetchClassInfo';
// yarn add --dev @types/react-slick
// yarn add react-slick
// yarn add slick-carousel
// flex 와 slick은 절때 사용금지
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from './ClassSlick';

const BestClass = () => {
  const { classInfos, setClassInfos } = useClassInfoStore();

  useEffect(() => {
    const getClassInfos = async () => {
      const infos = await getClassAllInfo();
      //좋아요순
      infos.sort((a, b) => b.likes - a.likes);
      setClassInfos(infos);
    };
    getClassInfos();
  }, []);

  return (
    <div className="mr-auto ml-auto">
      <p>BestClass</p>
      <div className="slider-container w-[85vw]">
        <Slider {...settings}>
          {classInfos.map((info, classId) => (
            <ClassCard key={classId} classInfos={info} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestClass;
