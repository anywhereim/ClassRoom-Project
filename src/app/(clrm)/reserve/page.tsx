import ClassInfo from '@/components/reserve/ClassInfo';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import PriceCalculator from '@/components/reserve/PriceCalculator';
import ReserveButton from '@/components/reserve/ReserveButton';
import CurrentReserveQuantity from '@/components/reserve/CurrentReserveQuantity';
import CheckAlreadyReserved from '@/components/reserve/CheckAlreadyReserved';
import { fetchReserveClassInfo } from '@/app/api/reserve/fetchReserveClassInfo';

export default async function ReservePage({ searchParams }: { searchParams: { classId: string } }) {
  const classId = searchParams.classId;
  const classInfo = await fetchReserveClassInfo(classId);

  console.log(classInfo);

  return (
    <div className="w-full h-full">
      <h1 className="text-xl">예약하기</h1>
      {classInfo ? (
        <div className="flex w-full h-full bg-gray-200 p-6">
          {/* <DateTimePicker classDateList={classInfo.dates} /> */}
          <div className="flex flex-col justify-between items-center w-full p-6">
            {/* CheckAlreadyReserved : 예약한 클래스인지 확인을 위한 임시 컴포넌트  */}
            <CheckAlreadyReserved classId={classInfo.classId} />
            <ClassInfo classInfo={classInfo} />
            <CurrentReserveQuantity classId={classInfo.classId} maxPeople={classInfo?.maxPeople} />
            <PriceCalculator price={classInfo.price} classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
            <ReserveButton classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
          </div>
        </div>
      ) : (
        <p>클래스 정보를 불러오는데 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      )}
    </div>
  );
}
