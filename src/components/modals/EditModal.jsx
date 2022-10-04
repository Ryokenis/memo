import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import './modal.css';
import axios from 'axios';

const Modal = (props) => {
  let id = props.id;

  const editSubmit = () => {
    console.log(id);

    axios({
      method: 'patch',
      url: '/posts',
      data: {
        _id: id,
        title: props.title,
        content: props.content,
      },
    });

    props.getPosts();
    props.toggleEditModal();
  };

  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-content">
          <h3 className="modalHeading">Edit Post</h3>
          <form>
            <input
              className="formTitle"
              onChange={props.handleChange}
              type="text"
              name="title"
              placeholder="Enter Title"
              value={props.title}
            />
            <textarea
              className="formContent"
              onChange={props.handleChange}
              rows="10"
              name="content"
              placeholder="Enter Content"
              value={props.content}
            />
            <button
              className="submitButton"
              type="button"
              onClick={() => editSubmit()}
            >
              SUBMIT
            </button>
          </form>
          <AiFillCloseCircle
            className="closeButton"
            onClick={props.toggleEditModal}
          >
            Close
          </AiFillCloseCircle>
        </div>
      </div>
    </div>
  );
};

export default Modal;
