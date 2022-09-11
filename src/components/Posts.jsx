import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go';
import './posts.css';

const Posts = (props) => {
  const editPost = () => {
    props.toggleEditModal(props.title, props.content);
  };

  return (
    <div className="posts">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <div className="icons">
        <button onClick={() => props.deletePost(props.place)}>
          <GoTrashcan />
        </button>
        <button onClick={() => editPost()}>
          <BsPencil />
        </button>
      </div>
    </div>
  );
};

export default Posts;
