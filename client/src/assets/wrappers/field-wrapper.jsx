import styled from "styled-components";

const FieldWrapper = styled.article`
  @media (min-width: 992px) {
    width: 22vw;
    display: flex;
    flex-direction: column;
    height: 200px;
    align-items: center;
    position: relative;
  }
  @media (max-width: 992px) {
    width: 22vw;
    display: flex;
    flex-direction: column;
    height: 200px;
    align-items: center;
    position: relative;
  }
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    display: grid;
    place-items: center;
    background: #eab619;
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
    width: 90%;
    height: 100%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }

  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
    @media (max-width: 992px) {
      width: 50px;
      height: 30px;
    }
  }
  .editable {
    background: #e0e8f9;
    color: #647acb;
  }
  .fixed {
    color: #d66a6a;
    background: #ffeeee;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
    transform: scale(0.98);
    transition: opacity 0.5s;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
    transform: scale(0.98);
    transition: opacity 0.5s;
  }
  .hidden {
    opacity: 0.6;
  }
  &:hover .actions {
    visibility: visible;
  }
  &:hover {
    transform: scale(0.98);
    transition: opacity 0.5s;
    opacity: 0.8;
  }
`;

export default FieldWrapper;
