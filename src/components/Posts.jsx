import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { ImCheckmark2 } from 'react-icons/im';
import { GoTrashcan } from 'react-icons/go';
import axios from 'axios';
import './posts.css';

const Posts = (props) => {
  const [editable, setEditable] = useState(false);

  const editPost = () => {
    setEditable(!editable);
    // props.toggleEditModal(props.title, props.content, props.id);
  };

  const confirmEdit = (newTitle, newContent) => {
    axios({
      method: 'patch',
      url: 'https://frozen-plains-79548.herokuapp.com/posts',
      data: {
        _id: props.id,
        title: newTitle,
        content: newContent,
      },
    });

    setEditable(!editable);
  };

  const handleClick = () => {
    let newContent = document.querySelectorAll('.editedContent');
    let newTitle = document.querySelectorAll('.editedTitle');
    confirmEdit(
      newTitle[props.place].innerHTML.replace(/[<]br[^>]*[>]/gi, ''),
      newContent[props.place].innerHTML.replace(/[<]br[^>]*[>]/gi, '')
    );
    props.getPosts();
  };

  return (
    <div className="posts">
      <h3
        className="editedTitle"
        contentEditable={editable}
        style={{ border: editable ? 'solid 1px blue' : null }}
      >
        {props.title}
      </h3>
      <p
        className="editedContent"
        contentEditable={editable}
        style={{ border: editable ? 'solid 1px blue' : null }}
      >
        {props.content}
      </p>
      <div className="icons">
        <button onClick={() => props.deletePost(props.id)}>
          <GoTrashcan />
        </button>
        {editable ? (
          <button onClick={() => handleClick()}>
            <ImCheckmark2 />
          </button>
        ) : (
          <button onClick={() => editPost()}>
            <BsPencil />
          </button>
        )}
      </div>
    </div>
  );
};

export default Posts;
