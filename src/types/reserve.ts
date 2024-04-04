// store에서 사용하기 위한 타입
export type ReserveInfo = {
  classId: string;
  userId: string;
  reservePrice: number;
  reserveQuantity: number;
  reserveDate: string;
  reserveTime: string;
};

// DB에서 받아온 값 타입
export type DBReserveInfo = {
  reserve_id: string;
  class_id: string;
  user_id: string;
  reserve_price: number;
  reserve_quantity: number;
  reserve_date: string;
  reserve_time: string;
};

export type ReserveStoreType = {
  reserveInfo: ReserveInfo;
  setReserveInfo: ({}) => void;
};

export interface reservationDetailsType {
  class_id: string;
  reserve_date: Date;
  reserve_time: Date;
  reserve_quantity: number;
  reserve_price: number;
  class: {
    class_id: string;
    title: string;
  };
}
