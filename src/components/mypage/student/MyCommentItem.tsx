import { deleteMyComment, updateMyComment } from '@/app/api/mypage/my-comments-api';
import { MyCommentType, NewCommentType } from '@/types/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';

const MyCommentItem = ({ comment }: { comment: MyCommentType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);

  const queryClient = useQueryClient();

  const commentId = comment.comment_id;

  // 후기 삭제 mutaion
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: (commentId: string) => deleteMyComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      });
    }
  });

  // 후기 수정 mutation
  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: ({ newContent, commentId }: NewCommentType) => updateMyComment({ newContent, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      });
    }
  });

  const handleOnChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  // 수정 & 완료 버튼
  const handleOnClickEditBtn = (commentId: string) => {
    if (isEditing) {
      if (newContent !== comment.content) {
        const confirm = window.confirm('수정하시겠습니까?');
        if (confirm) {
          updateCommentMutation({ newContent, commentId });
          setIsEditing((prev) => !prev);
        }
        return;
      } else {
        alert('수정사항이 없습니다.');
      }
    } else {
      setIsEditing((prev) => !prev);
    }
  };

  // 삭제 & 취소 버튼
  const handleOnClickDeleteCancleBtn = (commentId: string) => {
    if (isEditing) {
      const confirm = window.confirm('취소하시겠습니까?');
      if (confirm) {
        setNewContent(comment.content);
        setIsEditing((prev) => !prev);
      }
      return;
    } else {
      const confirm = window.confirm('삭제하시겠습니까?');
      if (confirm) {
        deleteCommentMutation(commentId);
        setIsEditing((prev) => !prev);
      }
      return;
    }
  };

  // 날짜 포멧
  const formattedDate = new Date(comment.create_at).toLocaleDateString();
  const formattedTime = new Date(comment.create_at).toLocaleTimeString();

  return (
    <li className="p-4 flex gap-4 border-y border-y-pale-color" key={comment.comment_id}>
      <div className="w-[300px] h-[200px]">
        {/* img 파일 불러오는 부분은 아직 수정 중입니다. */}
        <img
          src="https://d1x9f5mf11b8gz.cloudfront.net/class/20220308/ec9fa67b-0040-413d-ae8b-258d46df07c4.jpg"
          alt="클래스 대표 사진"
          width={300}
          height={200}
          className="w-full h-full p-4"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="p-4">
        <section className="flex gap-8">
          <p className="font-bold text-xl text-text-color">{comment.title}</p>
          <div className="flex gap-4">
            <span>
              작성일 : {formattedDate} {formattedTime}
            </span>
          </div>
        </section>
        <section className="pt-4">
          {isEditing ? (
            <textarea
              name=""
              placeholder="후기를 작성해봅시다"
              id=""
              className="w-[500px] h-[100px] textarea textarea-bordered"
              value={newContent}
              onChange={handleOnChangeComment}
            />
          ) : (
            <p className="w-[500px] h-[100px] py-4-">{comment.content}</p>
          )}

          <div className="flex justify-end gap-4 ">
            {isEditing ? (
              <button onClick={() => handleOnClickEditBtn(commentId)} className="btn">
                완료
              </button>
            ) : (
              <button onClick={() => handleOnClickEditBtn(commentId)} className="btn">
                수정
              </button>
            )}
            {isEditing ? (
              <button
                onClick={() => handleOnClickDeleteCancleBtn(commentId)}
                className="btn  bg-point-color text-white"
              >
                취소
              </button>
            ) : (
              <button
                onClick={() => handleOnClickDeleteCancleBtn(commentId)}
                className="btn  bg-point-color text-white"
              >
                삭제
              </button>
            )}
            <Link href={`list/detail/${comment.class_id}`}>
              <button className="btn bg-[#A4BEFF] text-white w-[150px]">클래스 보러가기</button>
            </Link>
          </div>
        </section>
      </div>
    </li>
  );
};

export default MyCommentItem;
