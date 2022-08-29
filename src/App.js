import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import Modal from './components/Modal';
import axios from 'axios';

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

  //Take into account the title and content values as the user types
  const handleChange = (e) => {
    let { name, value } = e.target;

    setPost((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  //Update list of posts after new submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: '/posts',
      data: {
        title: post.title,
        content: post.content,
      },
    });
    getPosts();
    toggleModal();
  };

  //Get posts from Database
  useEffect(() => {
    getPosts();
  }, []);

  //Get post Axios call
  const getPosts = () => {
    axios
      .get('/posts')
      .then((res) => {
        const data = res.data;
        setPostArray([...data]);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  //Delete Post
  const deletePost = (postID) => {
    axios
      .delete('/posts', { data: { _id: `"${postID}"` } })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });

    getPosts();
  };

  return (
    <>
      <Navbar toggleModal={toggleModal} />
      <div className="background">
        <div className="container">
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
                place={index}
                id={post._id}
                title={post.title}
                content={post.content}
                deletePost={deletePost}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
