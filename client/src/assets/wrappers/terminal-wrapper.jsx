import styled from "styled-components";

const TerminalWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Ubuntu+Mono");
  @import url("https://fonts.googleapis.com/css?family=Ubuntu");

  body {
    background: linear-gradient(45deg, #57003f 0%, #f57453 100%);
    font-family: "Ubuntu";
  }
  display: grid;
  place-items: center;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Terminal {
    width: 600px;
    height: 80px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
  }

  .Terminal__Toolbar {
    background: linear-gradient(#504b45 0%, #3c3b37 100%);
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    height: 25px;
    display: flex;
    align-items: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .Toolbar__buttons {
    display: flex;
    align-items: center;
  }

  .Toolbar__button {
    width: 12px;
    height: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    padding: 0;
    font-size: 7px;
    background: linear-gradient(#7d7871 0%, #595953 100%);
    text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 1px 0px #41403a, 0px 1px 1px 0px #474642;
    border: none;
    margin-right: 4px;
  }
  .Toolbar__button:hover {
    cursor: pointer;
  }
  .Toolbar__button--exit {
    background: #f25d2b;
    background: linear-gradient(#f37458 0%, #de4c12 100%);
    background-clip: padding-box;
  }
  .Toolbar__button:focus {
    outline: none;
  }

  .Toolbar__user {
    color: #d5d0ce;
    margin-left: 4px;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 1px;
  }
  .Terminal__body {
    background: rgba(56, 4, 40, 0.9);
    height: calc(100% - 25px);
    margin-top: -1px;
    padding-top: 2px;
    font-family: "Ubuntu mono";
  }
  .Terminal__text {
    color: #ddd;
  }

  .Terminal__Prompt {
    margin-top: 10px;
    display: flex;
  }

  .Prompt__user {
    color: #87d441;
  }
  .Prompt__location {
    color: #6d85a9;
  }
  .Prompt__dollar {
    color: #ddd;
  }

  .Prompt__Input {
    border-color: rgba(56, 4, 40, 0.9);
    backface-visibility: hidden;
    display: flex;
    width: 500px;
    margin-left: 8px;
    outline: none;
    background: none;
    border: none;
    -webkit-text-fill-color: white;
  }
  .Prompt__Output {
    background: linear-gradient(45deg, #57003f 0%, #f57453 100%);
    width: 600px;
    height: 600px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
    padding: 0 8px;
    box-sizing: border-box;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    position: relative;
    -webkit-text-fill-color: white;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    .Terminal {
      max-height: 90%;
      width: 95%;
    }
  }
`;
export default TerminalWrapper;
