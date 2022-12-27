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
    width: 90%;
    height: 100px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
    background: rgba(56, 4, 40, 0.9);
    border-radius: 10px;
    font-family: "Ubuntu Mono";
    font-size: 18px;
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: 10px;
    box-sizing: border-box;
  }

  .Terminal__Toolbar {
    /* background: linear-gradient(#504b45 0%, #3c3b37 100%);
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    height: 25px;
    display: flex;
    align-items: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px; */
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
    /* background: rgba(56, 4, 40, 0.9); */
    /* height: calc(100% - 25px); */
    margin-top: -1px;
    padding-top: 2px;
    font-family: "Ubuntu mono";

    /* overflow-y: auto; */
  }
  .Terminal__text {
    color: #ddd;
  }

  .Terminal__Prompt {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
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
    background: linear-gradient(45deg, #57003f 0%, #f57453 100%);
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    color: #fff;
    outline: none;
    border: none;
    -webkit-text-fill-color: white;
    font-size: 18px;
    border-color: rgba(56, 4, 40, 0.9);
    backface-visibility: hidden;
  }
  .Prompt__Output {
    background: linear-gradient(45deg, #57003f 0%, #f57453 100%);
    width: 90%;
    height: 400px;
    border-radius: 10px;
    padding: 10px;
    /* box-sizing: border-box; */
    color: #fff;
    font-size: 24px;
    overflow-y: scroll;
    /* flex-direction: column; */
    padding-top: 50px;
    text-align: justify;
    word-wrap: break-word;
    /* display: block; */
    position: relative;
    display: block;
    resize: none;

    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    /* Style the thumb (the part that the user can drag) */
    ::-webkit-scrollbar-thumb {
      background: #57003f;
      border-radius: 10px;
    }

    /* Style the track (the background of the scrollbar) */
    ::-webkit-scrollbar-track {
      background: #f57453;
      border-radius: 10px;
    }
  }
  .Prompt__Input::placeholder {
    color: #ccc;
  }
  .Prompt__Input::before {
    content: attr(data-suggestion);
    position: absolute;
    top: 0;
    left: 0;
    color: #ccc;
    pointer-events: none;
    visibility: hidden;
  }
  .Prompt__Input[value]:before {
    visibility: visible;
  }
  .Prompt__Input:focus {
    box-shadow: 0 0 0 2px #ffffff;
    outline: none;
  }

  .autocomplete-container .autocomplete-suggestion {
    background-color: #fff;
    border: 1px solid #ddd;
    overflow: auto;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    z-index: 1;
  }

  /* .autocomplete-suggestion li {
    list-style: none;
    padding: 10px;
  }

  .autocomplete-suggestion li:hover {
    background-color: #f5f5f5;
  }

  .autocomplete-suggestion li.selected {
    background-color: #eaeaea;
  } */

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

  .title {
    font-size: 32px;
    font-weight: bold;
    color: #333; /* dark grey color */
    text-align: center;
    margin-bottom: 16px;
  }

  .search-container {
    display: flex;
    align-items: center;
    border: 1px solid #333; /* dark grey color */
    border-radius: 4px;
    padding: 4px 8px;
    margin-bottom: 16px;
  }

  .search-icon {
    color: #333; /* dark grey color */
    margin-right: 8px;
  }

  .search-input {
    border: none;
    border-bottom: 2px solid white;
    background: transparent;
    color: #333; /* dark grey color */
    font-size: 16px;
    outline: none;
    width: 100%;
  }

  .set-button,
  .cancel-button {
    background: #333; /* dark grey color */
    border: none;
    color: white;
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }

  .set-button:hover,
  .cancel-button:hover {
    background: #444; /* darker grey color */
  }

  .Terminal__Prompt .open-ospf-modal-button {
    width: 80px;
    height: 40px;
    background-color: #57003f;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-left: auto;
  }

  .Terminal__Prompt .open-ospf-modal-button:hover {
    background-color: #f57453;
  }

  .Terminal__Prompt .copy-button {
    /* add your styles here */
    width: 80px;
    height: 40px;
    background-color: #57003f;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    /* add the glow effect and shadows */
    box-shadow: 0 0 10px #57003f;
    /* position the button near the .open-ospf-modal-button element */
    margin-left: 10px;
  }

  .Terminal__Prompt .copy-button:hover {
    /* add your hover styles here */
    background-color: #f57453;
  }
`;

export default TerminalWrapper;
