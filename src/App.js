import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import NewPostModal from './components/modals/NewPostModal';
import EditModal from './components/modals/EditModal';
import axios from 'axios';

function App() {
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const [postArray, setPostArray] = useState([]);

  const [newModal, setNewModal] = useState(false);

  //Toggles modal for new post
  const toggleNewModal = () => {
    setNewModal(!newModal);
  };

  const [editModal, setEditModal] = useState(false);

  //Toggles edit modal
  const toggleEditModal = (title, content) => {
    setPost({
      title: title,
      content: content,
    });
    setEditModal(!editModal);
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

    axios
      .post('/posts', {
        title: post.title,
        content: post.content,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    getPosts();
    toggleNewModal();
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
      .delete('/posts', { data: { _id: postID } })
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
      <Navbar toggleModal={toggleNewModal} />
      <div className="background">
        <div className="container">
          {newModal && (
            <NewPostModal
              toggleNewModal={toggleNewModal}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          )}
          {editModal && (
            <EditModal
              toggleEditModal={toggleEditModal}
              // editSubmit={editSubmit}
              handleChange={handleChange}
              id={post._id}
              title={post.title}
              content={post.content}
              getPosts={getPosts}
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
                handleChange={handleChange}
                toggleEditModal={toggleEditModal}
                getPosts={getPosts}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
