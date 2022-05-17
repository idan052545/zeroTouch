import React, { useState, useEffect } from "react";
import QuestionBox from "../components/question-box/question-box";
import CustomButton from "../components/custom-button/custom-button";

const QuestionsPage = () => {
  const numOfQue = 4;
  const [curQue, setCurQue] = useState(0);
  useEffect(() => {
    if (curQue >= numOfQue) {
      setCurQue(0);
    }
  }, [curQue]);
  return (
    <div>
      {curQue === 0 ? <QuestionBox label="מהי הרשת שלך" /> : null}
      {curQue === 1 ? <QuestionBox label="IP" /> : null}
      {curQue === 2 ? <QuestionBox label="מספר אתר" /> : null}
      {curQue === 3 ? <QuestionBox label="כמה משתמשים" /> : null}
      <CustomButton
        onClick={() => setCurQue(curQue + 1)}
        className="btn btn-block"
      >
        NEXT
      </CustomButton>
    </div>
  );
};
export default QuestionsPage;
