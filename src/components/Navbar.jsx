import React from 'react';
import './navbar.css';
import { BsSearch } from 'react-icons/bs';

const Navbar = (props) => {
  return (
    <>
      <nav>
        <h1 className="logo">MEMO</h1>
        <ul>
          <li>
            <BsSearch />
          </li>
          <li
            onClick={() => {
              props.toggleModal();
            }}
            style={{ cursor: 'pointer' }}
          >
            New Post
          </li>
          <li>
            <button>LOGOUT</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
