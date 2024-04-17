'use client';

import { fetchClassInfoOnComment } from '@/app/api/mypage/my-comments-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useQuery } from '@tanstack/react-query';
import MyCommentItem from './MyCommentItem';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination';

const MyComments = () => {
  const { loginUserId } = useLoginStore();

  // 페이지네이션
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2; // 한 페이지당 보여줄 포스트의 개수

  // 후기 리스트 불러오기
  const { data: myComments, isPending } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchClassInfoOnComment(loginUserId),
    enabled: !!loginUserId
  });

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page]);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myComments || myComments.length === 0) {
    return <div> 내가 작성한 후기가 없습니다.</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myComments.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ul className="flex flex-col align-center max-w-screen-xl">
      {currentPosts.map((comment) => (
        <MyCommentItem key={comment.comment_id} comment={comment} />
      ))}
      <Pagination
        totalItems={myComments.length}
        itemCountPerPage={postsPerPage}
        pageCount={5}
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
      />
    </ul>
  );
};

export default MyComments;