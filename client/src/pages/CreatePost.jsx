import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getCreatePost } from "../slices/postSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useSelector(state => state.auth);
  const accessToken = loginUser?.data?.accessToken;

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  const dispatch = useDispatch();
  const { createPost, error, isLoading } = useSelector(state => state.post);

  const createPostHandler = (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);

    dispatch(getCreatePost(postData));
  };

  useEffect(() => {
    if (createPost) {
      navigate('/');
    }
  }, [createPost, navigate]);

  const quillRef = useRef();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'indent',
    'align',
    'link', 'image'
  ];

  const POST_CATEGORIES = [
    "Agriculture", "Business", "Education", "Entertainment", "Art", "Design", "Technology"
  ];

  if (isLoading) {
    return (
      <section className="center">
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className='create-post'>
      <div className='container'>
        <h2>Create Post</h2>
        {error && <p className='form__error-message'>{error}</p>}
        <form className='form create-post__form' onSubmit={createPostHandler}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))
            }
          </select>
          <ReactQuill
            ref={quillRef}
            className='ql-editor'
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='image/png, image/jpg, image/jpeg' />
          <button type='submit' className='btn primary'>Create</button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
