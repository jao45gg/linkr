import styled from "styled-components";
import Modal from "react-modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios.js";

Modal.setAppElement("#root");

const ModalPopUp = ({ modal, setModal, id, tipo, link, description, userId }) => {
  const axios = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [repostId, setRepostId] = useState(0)

  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal((curr) => !curr)}
      style={customStyles}
      contentLabel="Example Modal">
      <ModalContent>
        <h2>{tipo === "delete" ?
          "Are you sure you want to delete this post?" :
          "Do you want to re-post this link?"}</h2>
        <div>
          <button onClick={() => setModal((curr) => !curr)} data-test="cancel">
            {loading ? (
              <ThreeDots
                height="12"
                width="24"
                radius="8"
                color="#1072f1"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              tipo === "delete" ? "No, go back" : "No, cancel"
            )}
          </button>
          <button
            onClick={async () => {
              setLoading((curr) => !curr);
              try {
                if (tipo === "delete") {
                  await axios.delete(`/posts/delete/${id}`);
                } else {

                  const promise = axiosPrivate.post(`/posts/repost`, { id: userId, url: link, description: description });
                  promise.then(res => {
                    const promise = axiosPrivate.post(`/posts/share/${id}`, { repost: res.data.new_id })
                    promise.then(() => window.location.reload)
                  })
                 
                }
                navigate(`/`);
              } catch (error) {
                setModal((curr) => !curr);
                alert("Nao foi possivel deletar o post");
              } finally {
                setLoading((curr) => !curr);
                setModal((curr) => !curr);
              }
            }}
            data-test="confirm">
            {loading ? (
              <ThreeDots
                height="12"
                width="24"
                radius="8"
                color="#fff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              tipo === "delete" ? "Yes, delete it" : "Yes, share!"
            )}
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
    color: "#fff",
    background: "#333333",
    borderRadius: "50px",
  },
};

const ModalContent = styled.div`
  width: 100%;
  height: 100%;

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
