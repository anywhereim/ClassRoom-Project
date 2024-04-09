"use client";
import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import useRegisterStore from '@/store/registerStore';
import { AddressData } from '@/types/register';

const Address = () => {
  const { address, detailAddress, setAddress, setDetailAddress } = useRegisterStore();

  // Daum Postcode Popup을 사용하기 위한 스크립트 URL
  const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: AddressData) => {
    let fullAddress = data.address; // address : 기본 주소 (ex. 경기 성남시 분당구 판교역로 166)
    let extraAddress = '';

    if (data.addressType === 'R') { // R : 검색된 기본 주소 타입 (도로명)
      if (data.bname !== '') { // bname : 법정동/법정리 이름 (ex.백현동)
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName; // buildingName : 건물명 (ex.카카오 판교 아지트)
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress); // 주소 상태 업데이트
  };

  const handleOpenPostCode = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className='my-2'>
      <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-2 my-2">
        <p className='text-base flex-shrink-0 font-bold'>위치</p>
        <input
          className="form-input px-3 py-2 border rounded flex-grow sm:flex-grow-0 sm:w-auto"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소를 입력해주세요"
        />
        <button onClick={handleOpenPostCode} className="px-4 py-2 bg-[#4D80FF] text-white rounded hover:bg-blue-700 w-full sm:w-auto mt-2 sm:mt-0">주소 검색</button>
      </div>
      <input
        className="form-input px-3 py-2 border rounded w-full"
        type="text"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
        placeholder="상세 주소를 입력해주세요"
      />
    </div>
  );
}

export default Address;
