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

  const [count, setCount] = useState(0);
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

  //Axios Request to Post
  const postRequest = async () => {
    try {
      await axios.post('http://localhost:5000/posts', {
        title: post.title,
        content: post.content,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Axios Request to Delete
  const postDelete = async (postID) => {
    try {
      await axios.delete('http://localhost:5000/posts', {
        data: { _id: postID },
      });
    } catch (err) {
      console.log(err);
    }
  };

  let counting = () => {
    setCount(count + 1);
  };

  //Update list of posts after new submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    postRequest();
    toggleNewModal();
    setTimeout(counting, 200);
  };

  // Get posts from Database
  useEffect(() => {
    getPosts();
  }, [count]);

  //Get post Axios call
  const getPosts = () => {
    axios
      .get('http://localhost:5000/posts')
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
    postDelete(postID);
    setTimeout(counting, 200);
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
              getPost={getPosts}
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
