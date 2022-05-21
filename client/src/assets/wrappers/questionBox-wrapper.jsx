import styled from "styled-components";
const QuestionBoxWrapper = styled.div`
  .btn {
    padding: 10px 20px;
    border: 1px solid #000;
    border-radius: 5px;
    background: #000;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    appearance: button;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
  }

  .btn svg {
    margin-right: 8px;
  }

  .btn-reverse {
    background: #fff;
    color: #000;
  }

  .btn-block {
    width: 100%;
    margin-bottom: 20px;
  }

  .btn-sm {
    padding: 5px 15px;
    font-size: 13px;
  }

  .btn-danger {
    background: darkred;
    border: none;
  }

  .btn-back {
    width: 150px;
    margin-bottom: 20px;
  }

  .btn:hover {
    transform: scale(0.98);
    transition: opacity 0.5s;
    opacity: 1;
  }
  .form {
    width: 70%;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 10px;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: inherit;
  }

  .form-group label {
    text-align: left;
    display: block;
    margin: 0 0 5px 3px;
  }

  .ticket,
  .ticket-headings {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background: #f4f4f4;
    padding: 10px 15px;
    border-radius: 5px;
    text-align: center;
  }

  .ticket-headings {
    font-weight: 700;
  }

  .boxes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-bottom: 30px;
  }

  .boxes div {
    padding: 30px;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
  }

  .boxes h2 {
    margin-top: 20px;
  }

  .boxes a:hover {
    color: #777;
  }

  .ticket-created {
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 50px;
  }

  .ticket-number {
    margin-bottom: 30px;
  }

  .ticket-number h2 {
    font-size: 2.3rem;
    margin-bottom: 10px;
  }

  .ticket-number p {
    font-size: 1.3rem;
  }

  .ticket-info {
    font-size: 1.3rem;
  }

  .status {
    background-color: #333;
    color: #fff;
    width: 100px;
    padding: 0 20px;
    justify-self: center;
    border-radius: 10px;
    font-size: 16px;
    text-align: center;
  }

  .status-new {
    background-color: green;
    color: #fff;
    border-radius: 10px;
  }

  .status-open {
    background-color: steelblue;
    color: #fff;
    border-radius: 10px;
  }

  .status-closed {
    background-color: darkred;
    color: #fff;
    border-radius: 10px;
  }

  .ticket-page {
    position: relative;
    text-align: left;
  }

  .ticket-page h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ticket-page .btn {
    margin-bottom: 30px;
  }

  .ticket-page .btn-block {
    width: 100%;
    margin-top: 30px;
  }

  .ticket-desc {
    margin: 20px 0;
    font-size: 17px;
    background-color: #f4f4f4;
    border: 1px #ccc solid;
    padding: 10px 15px;
    border-radius: 5px;
  }

  .note {
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    text-align: left;
    padding: 20px;
    margin-bottom: 20px;
    position: relative;
  }

  .note-head {
    background: #f4f4f4;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .note-date {
    position: absolute;
    top: 15px;
    right: 10px;
    font-size: 14px;
  }

  .delete-note {
    color: red;
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  .btn-close {
    background: none;
    border: none;
    color: #000;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .btn-close:hover {
    color: red;
    transform: scale(0.98);
  }

  p.status-in-progress {
    color: orangered;
  }

  p.status-waiting {
    color: red;
  }

  p.status-ready {
    color: steelblue;
  }

  p.status-complete {
    color: green;
  }

  footer {
    position: sticky;
    top: 95vh;
    text-align: center;
  }

  .loadingSpinnerContainer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 5000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loadingSpinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #000 transparent #555 transparent;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 600px) {
    .boxes {
      grid-template-columns: 1fr;
    }

    .form {
      width: 90%;
    }

    .ticket-created h2,
    .heading h1 {
      font-size: 2rem;
    }

    .heading p {
      font-size: 1.5rem;
    }
  }
`;
export default QuestionBoxWrapper;
