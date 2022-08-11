import { BsPencil } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go';
import './posts.css';

const Posts = (props) => {
  return (
    <div className="posts">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <div className="icons">
        <button onClick={() => props.deletePost(props.id)}>
          <GoTrashcan />
        </button>
        <button>
          <BsPencil />
        </button>
      </div>
    </div>
  );
};

export default Posts;
