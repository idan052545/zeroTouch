import styled from "styled-components";

const TopologyWrapper = styled.div`
  #download-image .react-flow {
    background: #1a365d;
  }

  #download-image .react-flow__node-custom .react-flow__handle-right {
    transform: none;
  }

  #download-image.wrapper {
    position: relative;
    height: 100%;
  }

  #download-image .download-btn {
    position: absolute;
    top: 10px;
    right: 50px;
    z-index: 10;
    border: 1px solid #eee;
    background: #ebf8ff;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
  }

  #download-image .download-btn:hover {
    opacity: 0.9;
  }

  #download-image .sidebar {
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 100%;
    background: black;
    box-shadow: 0 0 10px white;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      width: 200px;
    }
  }
`;
export default TopologyWrapper;
