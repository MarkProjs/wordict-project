import { useState, useEffect } from 'react';
import FavoriteWords from "../Profile/FavoriteWords";
import UserProfile from "../Profile/UserProfile";
import UserRank from "../Profile/UserRank";
import './Profile.css';
import FetchModule from '../../controllers/FetchModule';

function Profile() {
  const placeholderPicture = process.env.PUBLIC_URL + '/img/profile_placeholder.png';
  const placeholderName = "Loading..."
  const [isViewMode, setIsViewMode] = useState(true);
  const [profilePicture, setProfilePicture] = useState(placeholderPicture);
  const [profileName, setProfileName] = useState(placeholderName);
  const [previousProfileName, setPreviousProfileName] = useState("");

  useEffect(() => {
    /**
     * Fetch user from api
     */
    async function getData() {
      let data = await FetchModule.fetchUser();
      setProfileName(data[0].name);
      setProfilePicture(data[0].image);
    }
    getData();
  }, []);

  //TODO: add comments
  const profileView =
    <>
      <section className="left-section">
        <UserProfile image={profilePicture} />
        <UserRank />
      </section>
      <section className="right-section">
        <div className="top-part">
          <h1 className="name">{profileName}</h1>
          <button onClick={() => {
            setPreviousProfileName(profileName);
            setIsViewMode(false);
          }}>Edit profile</button>
        </div>
        <FavoriteWords />
      </section>
    </>;

  const profileEdit =
    <div className="edit-container">
      <section className="form-section">
        <h2>Edit Profile</h2>
        <form onSubmit={updateProfile} className="edit-form">
          <label>Name: </label>
          <input id="username" type="text" name="username" defaultValue={profileName}
            onChange={(e) => setProfileName(e.target.value)} />
          <br />
          <label>Change profile picture: </label>
          <input type="file" name="file" accept="image/*"
            onChange={(e) => setProfilePicture(window.URL.createObjectURL(e.target.files[0]))} />

          <br />
          <div className="form-buttons">
            <input type="submit" value="Save" />
            <button onClick={() => {
              setProfileName(previousProfileName);
              setIsViewMode(true);
            }}>Cancel</button>
          </div>
        </form>
      </section>

      <section className="preview-section">
        <p>Quick Preview:</p>
        <article>
          <img alt="profile picture" src={profilePicture} />
          <h1 className="name">{profileName}</h1>
        </article>
      </section>
    </div>
    ;

  function updateProfile() {
    // update user profile using api

    setIsViewMode(true);
  }

  return (
    <main>
      {isViewMode ? profileView : profileEdit}
    </main>
  )
}

export default Profile;