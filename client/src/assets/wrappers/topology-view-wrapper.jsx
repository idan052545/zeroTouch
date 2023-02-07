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

  .app-calculator-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    background-color: #ffffff;
    border-radius: 5px;
  }

  .app-dropdown-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .app-dropdown-container label {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .app-dropdown-container select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eee;
  }

  .app-calculate-btn,
  .app-modal-close-btn {
    padding: 5px 15px;
    border-radius: 5px;
    border: 1px solid #333;
    background-color: #333;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
  }

  .app-calculate-btn:hover,
  .app-modal-close-btn:hover {
    background-color: #fff;
    color: #333;
  }

  .app-modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  .app-modal {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #16080834;
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0 0 10px white;
    width: 500px;
    z-index: 12;
  }

  .app-show-modal .app-modal-overlay,
  .app-show-modal .app-modal {
    display: block;
  }
`;
export default TopologyWrapper;
