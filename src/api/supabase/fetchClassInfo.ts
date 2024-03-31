import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../../app/api/supabase/supabase';
import { ClassType } from '@/types';

// 메인페이지, 리스트페이지, 디테일페이지, 예약페이지 클래스 정보 불러오는 함수 모음

export const fetchClassInfo = async ({ classId }: { classId: string }) => {
  console.log(classId);
  const { data: classInfo, error }: PostgrestSingleResponse<ClassType> = await supabase
    .from('class')
    .select('class_id, category, title, location, price, image, max_ppl')
    .eq('class_id', classId)
    .single();

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return;
  }

  return classInfo;
};

// 여러 클래스 정보를 불러오는 함수
//따로 만든 이유 -> single이 단일 정보만 불러오기 때문
export const fetchClassInfos = async ({ classId }: { classId: string }) => {
  const { data: classInfos, error } = await supabase.from('class').select('*').eq('class_id', classId);

  if (error) {
    console.error('클래스 정보들 불러오기 오류 => ', error);
    return [];
  }

  return classInfos;
};
