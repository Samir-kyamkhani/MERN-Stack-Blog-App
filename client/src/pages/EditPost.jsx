import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { letsEditPost } from '../slices/postSlice'

function EditPost() {
  const { editPost, userPostDetails, error, isLoading } = useSelector(state => state.post)
  const [title, setTitle] = useState(userPostDetails?.title)
  const [category, setCategory] = useState(userPostDetails?.category)
  const [description, setDescription] = useState(userPostDetails?.description)
  const [thumbnail, setThumbnail] = useState(userPostDetails?.thumbnail)
  

  const navigate = useNavigate();
  const { loginUser } = useSelector(state => state.auth);
  const accessToken = loginUser?.data?.accessToken;
  
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });

  const dispatch = useDispatch()
  const {id} = useParams()

  const editPostHandler = (e) => {
    e.preventDefault()
    const postData = new FormData()
    postData.set("title", title)
    postData.set("category", category)
    postData.set("description", description)
    postData.set("thumbnail", thumbnail)

    dispatch(letsEditPost(postData, id))
    
    if (editPost ) {
      navigate('/')
    }

  }

  

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'indent',
    'align',
    'link', 'image'
  ]

  const POST_CATEGORIES = [
    "Agriculuter", "Business", "Education", "Entertainment", "Art", "Design", "Technology"
  ]

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
      <div className='conainer'>
        <h2>Edit Post</h2>
        {error && <p className='form__error-message'>{error}</p>}
        <form className='form create-post__form' onSubmit={editPostHandler}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))
            }
          </select>

            <ReactQuill className='ql-editer' modules={modules} formats={formats} value={description} onChange={setDescription} />
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
            <button type='submit' className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost