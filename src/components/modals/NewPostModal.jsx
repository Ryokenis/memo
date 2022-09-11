import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import './modal.css';

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-content">
          <h3 className="modalHeading">Create Post</h3>
          <form onSubmit={props.handleSubmit}>
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
            <button className="submitButton" type="submit">
              SUBMIT
            </button>
          </form>
          <AiFillCloseCircle
            className="closeButton"
            onClick={props.toggleNewModal}
          >
            Close
          </AiFillCloseCircle>
        </div>
      </div>
    </div>
  );
};

export default Modal;
