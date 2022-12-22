import TerminalWrapper from "../../assets/wrappers/terminal-wrapper";
import FormInput from "../form-input/form-input";

const Terminal = ({ text, user }) => {
  const handleChange = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
  };

  return (
    <TerminalWrapper>
      <input disabled className="Prompt__Output" />
      <div className="container">
        <div className="Terminal">
          <div className="Terminal__Toolbar">
            <div className="Toolbar__buttons"></div>
            <p className="Toolbar__user"></p>
          </div>
          <div className="Terminal__body">
            <div className="Terminal__text"></div>
            <div className="Terminal__Prompt">
              <span className="Prompt__user"></span>
              <span className="Prompt__location">~</span>
              <span className="Prompt__dollar">$</span>
              <span className="Prompt__cursor"></span>
              <FormInput
                className="Prompt__Input"
                type="text"
                id={text}
                name={text}
                placeholder={text}
                handleChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </TerminalWrapper>
  );
};
export default Terminal;
