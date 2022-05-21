import React, { useState, useEffect } from "react";
import QuestionBox from "../components/question-box/question-box";
import CustomButton from "../components/custom-button/custom-button";
import QuestionBoxWrapper from "../assets/wrappers/questionBox-wrapper";
const QuestionsPage = () => {
  const numOfQue = 4;
  const [curQue, setCurQue] = useState(0);
  useEffect(() => {
    if (curQue >= numOfQue) {
      setCurQue(0);
    }
  }, [curQue]);
  return (
    <QuestionBoxWrapper className="full-page">
      <form onSubmit={(e) => e.preventDefault()} className="form">
        {curQue === 0 ? (
          <QuestionBox label="מהי הרשת שלך" isDropdown={true} />
        ) : null}
        {curQue === 1 ? <QuestionBox label="IP" /> : null}
        {curQue === 2 ? (
          <QuestionBox label="מספר אתר" isDropdown={true} />
        ) : null}
        {curQue === 3 ? <QuestionBox label="כמה משתמשים" /> : null}
        <CustomButton
          type="submit"
          onClick={() => setCurQue(curQue + 1)}
          className="btn btn-block"
        >
          NEXT
        </CustomButton>
      </form>
    </QuestionBoxWrapper>
  );
};
export default QuestionsPage;
