'use client';

import MyClassStudentPage from '@/components/mypage/teacher/MyClassStudentPage';
import { Suspense } from 'react';

const MyClassStudentListPage = () => {
  return (
    <div>
      <Suspense>
        <MyClassStudentPage />
      </Suspense>
    </div>
  );
};

export default MyClassStudentListPage;
