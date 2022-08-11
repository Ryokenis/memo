import React from 'react';
import './modal.css';

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-content">
          <form onSubmit={props.handleSubmit}>
            <input
              onChange={props.handleChange}
              type="text"
              name="title"
              placeholder="Enter Title"
            />
            <textarea
              onChange={props.handleChange}
              rows="5"
              name="content"
              placeholder="Enter Content"
            />
            <button type="submit">Submit</button>
          </form>
          <button className="close-modal" onClick={props.toggleModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
