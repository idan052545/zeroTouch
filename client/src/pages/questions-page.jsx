import React, { useState, useEffect } from "react";
import QuestionBox from "../components/question-box/question-box";
import CustomButton from "../components/custom-button/custom-button";
import QuestionBoxWrapper from "../assets/wrappers/questionBox-wrapper";
import { toast } from "react-toastify";

const initialState = {
  network: "",
  IP: "",
  siteNumber: "",
  numOfUsers: 0,
};

const QuestionsPage = () => {
  const [values, setValues] = useState(initialState);

  const numOfQue = 4;
  const [curQue, setCurQue] = useState(0);
  useEffect(() => {
    if (curQue >= numOfQue) {
      setCurQue(0);
      setValues(initialState);
    }
  }, [curQue]);

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { network, IP, siteNumber, numOfUsers } = values;
    let check = "";
    switch (curQue) {
      case 0:
        check = network;
        break;
      case 1:
        check = IP;
        break;
      case 2:
        check = siteNumber;
        break;
      case 3:
        check = numOfUsers;
        break;
    }

    if (!check) {
      toast.error("Please fill out the field");
    } else {
      setCurQue(curQue + 1);
    }
  };

  return (
    <QuestionBoxWrapper className="full-page">
      <form onSubmit={(e) => e.preventDefault()} className="form">
        {curQue === 0 ? (
          <QuestionBox
            label="מהי הרשת שלך"
            name="network"
            isDropdown={true}
            handleChange={handleChange}
          />
        ) : null}
        {curQue === 1 ? (
          <QuestionBox label="IP" name="IP" handleChange={handleChange} />
        ) : null}
        {curQue === 2 ? (
          <QuestionBox
            label="מספר אתר"
            name="siteNumber"
            isDropdown={true}
            handleChange={handleChange}
          />
        ) : null}
        {curQue === 3 ? (
          <QuestionBox
            label="כמה משתמשים"
            name="numOfUsers"
            handleChange={handleChange}
          />
        ) : null}
        <CustomButton
          type="submit"
          onClick={onSubmit}
          className="btn btn-block"
        >
          NEXT
        </CustomButton>
      </form>
    </QuestionBoxWrapper>
  );
};
export default QuestionsPage;
