import TerminalWrapper from "../../assets/wrappers/terminal-wrapper";

const Terminal = ({ text, user }) => {
  return (
    <TerminalWrapper>
      <div className="container">
        <div className="Terminal">
          <div className="Terminal__Toolbar">
            <div className="Toolbar__buttons">
              <button className="Toolbar__button Toolbar__button--exit">
                &#10005;
              </button>
              <button className="Toolbar__button">&#9472;</button>
              <button className="Toolbar__button">&#9723;</button>
            </div>
            <p className="Toolbar__user"></p>
          </div>
          <div className="Terminal__body">
            <div className="Terminal__text"></div>
            <div className="Terminal__Prompt">
              <span className="Prompt__user"></span>
              <span className="Prompt__location">~</span>
              <span className="Prompt__dollar">$</span>
              <span className="Prompt__cursor"></span>
            </div>
          </div>
        </div>
      </div>
    </TerminalWrapper>
  );
};
export default Terminal;
