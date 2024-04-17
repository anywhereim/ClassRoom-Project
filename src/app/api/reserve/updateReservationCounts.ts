import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';

/* class 테이블의 reserved_count 관련 api */

// 예약 인원수 증가
export const increaseReservedCount = async ({ classId, quantity }: { classId: string; quantity: number }) => {
  const { data: increasedCount, error }: PostgrestSingleResponse<number> = await supabase.rpc(
    'increase_reserved_count',
    {
      _quantity: quantity,
      _class_id: classId
    }
  );

  if (error) {
    console.log('increaseReservedCount 오류 발생', error);
    return;
  }

  return increasedCount;
};

// 예약 인원수 감소
export const decreaseReservedCount = async ({ classId, quantity }: { classId: string; quantity: number }) => {
  const { data: decreasedCount, error }: PostgrestSingleResponse<number> = await supabase.rpc(
    'decrease_reserved_count',
    {
      _quantity: quantity,
      _class_id: classId
    }
  );

  if (error) {
    console.log('decreaseReservedCount 오류 발생', error);
    return;
  }

  return decreasedCount;
};