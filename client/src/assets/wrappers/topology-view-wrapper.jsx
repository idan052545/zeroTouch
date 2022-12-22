import styled from "styled-components";

const TopologyWrapper = styled.div`
  #download-image .react-flow {
    background: #1a365d;
  }

  #download-image .react-flow__node {
    width: 50px;
    height: 50px;
    color: white;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: white;
  }

  #download-image .react-flow__node-custom {
    font-size: 12px;
    background: #eee;
    border: 1px solid #555;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
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
    right: 10px;
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
`;
export default TopologyWrapper;
