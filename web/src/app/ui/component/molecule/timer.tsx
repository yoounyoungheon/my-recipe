'use client'
import { useEffect, useState } from "react";
import Form from "./form/form-index";
import { FormState } from "./form/form-root";
import AchromaticButton from "../atom/achromatic-button";

export function AutoCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function setTimer(prevForm: FormState, formDate: FormData){
    const time = Number(formDate.get('time'));
    if(!isNaN(time)&&time>0){
      setCount(time)
      return {
      isSuccess: true,
      isFailure: false,
      message: '타이머 시작',
      validationError: {}
      }
    }else {
      return {
        isSuccess: false,
        isFailure: true,
        message: '유효한 시간을 입력해주세요',
        validationError: {}
      }
    }
  }
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning && count > 0) {
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(intervalId!); // 타이머가 0이 되면 정지
            alert('시간이 다 되었습니다!');
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    // 타이머 정리
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, count]); // count와 isRunning이 변경될 때마다 타이머 동작

  function startTimer() {
    setIsRunning(true);
  }
  return (
    <div className="flex flex-col justify-center space-x-1 space-y-1">
      <Form id="timer" action={setTimer} onSuccess={()=>{startTimer();}} failMessageControl="alert">
        <div className="flex items-center space-x-2">
        <Form.NumberInput label="" id='time' placeholder="timer"></Form.NumberInput>
        <AchromaticButton type="submit" className="mt-2 bg-emerald-300">start</AchromaticButton>
        </div>
      </Form>
      <p>Timer: {count}</p>
      <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
    </div>
  );
}