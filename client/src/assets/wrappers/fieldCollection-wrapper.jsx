import styled from "styled-components";

const FieldCollectionWrapper = styled.section`
  .collection-page {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 38px;
      margin: 0 auto 30px;
    }

    .items {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 10px;
      background: rgba(245, 245, 245, 0.8);
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      transition: all 0.5s ease-in-out;

      & .collection-item {
        margin-bottom: 30px;
      }

      &.show {
        transform: scale(1);
        animation: expand 0.5s ease-in-out;
      }

      &.hide {
        transform: scale(0);
        animation: shrink 0.5s ease-in-out;
      }
    }

    /* add a gradient background to the expander button */
    button.expander-button {
      background: linear-gradient(to right, #ff5e62, #ff9966);
      border: none;
      font-size: 18px;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      transition: all 0.5s ease-in-out;
    }
    /* change the color of the expander button on hover */
    button.expander-button:hover {
      background: linear-gradient(to right, #ff9966, #ff5e62);
    }
  }

  @keyframes expand {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes shrink {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(0.95);
      opacity: 0.5;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }

  .btn-block {
    margin-top: 100px;
  }

  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .fields {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (max-width: 992px) {
    button.expander-button {
      font-size: 16px;
    }
    .fields {
      grid-template-columns: 1fr;
    }
  }

  /* use media queries to adjust the layout and styling of the expander for different screen sizes */
  @media (max-width: 992px) {
    button.expander-button {
      font-size: 16px;
    }
    .fields {
      grid-template-columns: 1fr;
    }
  }
`;
export default FieldCollectionWrapper;
