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

      & .collection-item {
        margin-bottom: 30px;
      }
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
  @media (min-width: 992px) {
    .fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
export default FieldCollectionWrapper;
