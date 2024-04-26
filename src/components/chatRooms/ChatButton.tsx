'use client';
import { useReadCheckMessageAll } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export default function ChatButton() {
  const { loginUserId } = useLoginStore();
  const router = useRouter();
  const { readLeftChekcMessageAll } = useReadCheckMessageAll(loginUserId!);

  const handleClick = () => {
    if (!loginUserId) {
      const confirm = window.confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동 하시겠습니까?');
      if (confirm) {
        router.push('/hello');
      }
    } else {
      router.replace('/messages');
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handleClick}
        className="flex w-full flex-col items-center text-background-color transition ease-in hover:text-main-color md:text-icon-color"
      >
        <IoChatbubbleEllipsesOutline className="text-4xl sm:text-4xl md:text-4xl" />
        <div className=" hidden sm:flex md:sm:flex">채팅</div>
      </button>
      {readLeftChekcMessageAll ? (
        <div className="absolute bottom-5 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-button-focus-color md:bottom-10 md:right-3 md:bg-main-color">
          <div className="text-white">{readLeftChekcMessageAll}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
