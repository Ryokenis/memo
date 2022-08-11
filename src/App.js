import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import Modal from './components/Modal';

function App() {
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const [postArray, setPostArray] = useState([]);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setPost((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPostArray((prevValue) => [...prevValue, post]);
    setPost({
      title: '',
      content: '',
    });
    toggleModal();
  };

  const deletePost = (id) => {
    setPostArray((prevPost) => {
      return prevPost.filter((item, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div className="background">
      <div className="container">
        <Navbar toggleModal={toggleModal} />
        {modal && (
          <Modal
            toggleModal={toggleModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        )}
        {postArray.map((post, index) => {
          return (
            <Posts
              key={index}
              id={index}
              title={post.title}
              content={post.content}
              deletePost={deletePost}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
