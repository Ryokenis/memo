import React from 'react';
import './navbar.css';

const Navbar = (props) => {
  return (
    <nav>
      <h1 className="logo">MEMO</h1>
      <ul>
        <li
          onClick={() => {
            props.toggleModal();
          }}
          style={{ cursor: 'pointer' }}
        >
          <button className="newPostButton">New Post</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
