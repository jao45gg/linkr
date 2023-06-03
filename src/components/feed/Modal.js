import styled from "styled-components";
import Modal from "react-modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

Modal.setAppElement("#root");

const ModalPopUp = ({ modal, setModal }) => {
  const axios = useAxiosPrivate();

  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal((curr) => !curr)}
      style={customStyles}
      contentLabel="Example Modal">
      <ModalContent>
        <h2>Are you sure you want to delete this post?</h2>
        <div>
          <button onClick={() => setModal((curr) => !curr)}>No, go back</button>
          <button
            onClick={async () => {
              //setar loading
              try {
                axios.delete(`/delete/:id`);
              } catch (error) {
                setModal((curr) => !curr);
                alert("Nao foi possivel deletar o post");
              } finally {
                //tirar loading
                setModal((curr) => !curr);
              }
            }}>
            Yes, delete it
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "597px",
    width: "100%",
    height: "262px",
    background: "#333333",
    borderRadius: "50px",
  },
};

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  h2 {
    font-size: 1.5em;
    max-width: 70%;
    text-align: center;
  }
  div {
    display: flex;
    gap: 1em;
  }
  button {
    padding: 0.5em 1em;

    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    background-color: #1877f2;
    color: #f9f9f9;

    &:hover {
      border-color: #1877f2;
    }
    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }
  button:first-child {
    background-color: #f9f9f9;
    color: #1877f2;
  }
  button:last-child:hover {
    background-color: #f9f9f9;
    color: #1877f2;
  }
`;

export default ModalPopUp;
