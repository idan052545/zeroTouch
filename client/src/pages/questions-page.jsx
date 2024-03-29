import React, { useState } from "react";
import QuestionBox from "../components/question-box/question-box";
import CustomButton from "../components/custom-button/custom-button";
import QuestionBoxWrapper from "../assets/wrappers/questionBox-wrapper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInStart } from "../redux/user/user-actions";
import { useNavigate } from "react-router-dom";
import questions from "../questions";

const initialState = {
  network: "",
  IP: "",
  siteNumber: "",
  numOfUsers: 0,
};

const regexExp =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi; //ip validate

const QuestionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const [curQue, setCurQue] = useState(0);
  /* useEffect(() => {
    if (curQue >= numOfQue) {
      setCurQue(0);
      setValues(initialState);
    }
  }, [curQue]);*/

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { network, IP, siteNumber, numOfUsers } = values;
    let check = "";
    let valid = true;
    switch (curQue) {
      case 0:
        check = network;
        if (!check) {
          toast.error("בבקשה מלא את השדה");
          valid = false;
        }
        break;
      case 1:
        check = IP;
        //check if id in correct format
        if (!regexExp.test(check)) {
          toast.error("בבקשה מלא את השדה בפורמט נכון ");
          valid = false;
        }
        break;
      case 2:
        check = siteNumber;
        if (!check) {
          toast.error("בבקשה מלא את השדה");
          valid = false;
        }
        break;
      case 3:
        check = numOfUsers;
        if (isNaN(check)) {
          toast.error("בבקשה הכנס מספר ");
          check = "";
          valid = false;
        }
        break;
      default:
    }
    if (valid) {
      setCurQue(curQue + 1);
      if (curQue === questions.length - 1) {
        dispatch(signInStart(values));
        navigate("/user");
      }
    }
  };

  return (
    <QuestionBoxWrapper className="full-page">
      <form onSubmit={(e) => e.preventDefault()} className="form">
        {questions?.map(({ id, name, ...otherCollectionProps }) =>
          curQue === id ? (
            <QuestionBox
              key={id}
              name={name}
              {...otherCollectionProps}
              handleChange={handleChange}
            />
          ) : null
        )}

        <CustomButton
          type="submit"
          onClick={onSubmit}
          className="btn btn-block"
        >
          המשך
        </CustomButton>
      </form>
    </QuestionBoxWrapper>
  );
};
export default QuestionsPage;
