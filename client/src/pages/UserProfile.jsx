import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPostAuthor,
  updateAvatar,
  updateUserDetails,
} from "../slices/postSlice";

function UserProfile() {
  const [avatar, setAvatar] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const {
    postAuthor,
    updateAvatarByUser,
    updateProfileDetails,
    isLoading,
    error,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { loginUser } = useSelector((state) => state.auth);
  const accessToken = loginUser?.data?.accessToken;

  const { id } = useParams();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (!postAuthor) {
      dispatch(getPostAuthor(id));
    } else {
      setUserData({
        email: postAuthor?.email,
        name: postAuthor?.fullName,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [postAuthor, dispatch]);

  useEffect(() => {
    if (postAuthor?.avatar) {
      setAvatar(postAuthor.avatar);
    }
  }, [postAuthor]);

  // Change avatar
  const changeAvatarHandler = (e) => {
    e.preventDefault();
    setIsAvatarTouched(false);
    const formData = new FormData();
    formData.set("avatar", avatar);

    dispatch(updateAvatar(formData));
    setAvatar("");
  };

  useEffect(() => {
    if (updateAvatarByUser) {
      setAvatar(updateAvatarByUser.avatar);
    }
  }, [updateAvatarByUser]);

  // Update user details
  const updateProfileUserDetails = (e) => {
    e.preventDefault();

    dispatch(updateUserDetails(userData));
  };

  useEffect(() => {
    if (updateProfileDetails?._id) {
      navigate("/logout");
    }
  })

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

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
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${id}`} className="btn">
          My Posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="Avatar" />
            </div>
            {/* Form to update avatar */}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="image/png, image/jpg, image/jpeg"
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                {" "}
                <FaEdit />{" "}
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile__avatar-btn"
                onClick={changeAvatarHandler}
              >
                {" "}
                <FaCheck />{" "}
              </button>
            )}
          </div>
          <h1>{loginUser?.data?.user?.fullName}</h1>

          {/* Form to update user details */}
          <form
            className="form profile__form"
            onSubmit={updateProfileUserDetails}
          >
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={userData?.name}
              onChange={changeInputHandler}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={userData?.email}
              onChange={changeInputHandler}
            />
            <input
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={userData?.currentPassword}
              onChange={changeInputHandler}
            />
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={userData?.newPassword}
              onChange={changeInputHandler}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData?.confirmPassword}
              onChange={changeInputHandler}
            />
            <button type="submit" className="btn primary">
              Update my details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
