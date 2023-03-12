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

  // view user profile
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
            // set current profile name as previous to be used on cancel
            setPreviousProfileName(profileName);
            // set to edit mode
            setIsViewMode(false);
          }}>Edit profile</button>
        </div>
        <FavoriteWords />
      </section>
    </>;

  // preview edited user profile
  const profileEditPreview =
    <section className="preview-section">
      <p>Quick Preview:</p>
      <article>
        <img alt="profile picture" src={profilePicture} />
        <h1 className="name">{profileName}</h1>
      </article>
    </section>;

  // edit user profile
  const profileEdit =
    <div className="edit-container">
      <section className="form-section">
        <h2>Edit Profile</h2>
        <form onSubmit={updateProfile} className="edit-form">
          <label>Name: </label>
          <input id="username" type="text" name="username" defaultValue={profileName}
            // allow real time name change preview
            onChange={(e) => setProfileName(e.target.value)} />
          <br />
          <label>Change profile picture: </label>
          <input type="file" name="file" accept="image/*"
            // allow profile picture change preview
            onChange={(e) => setProfilePicture(window.URL.createObjectURL(e.target.files[0]))} />
          <br />
          <div className="form-buttons">
            <input type="submit" value="Save" />
            <button onClick={() => {
              // reset profile name using previous
              setProfileName(previousProfileName);
              // set to view mode
              setIsViewMode(true);
            }}>Cancel</button>
          </div>
        </form>
      </section>
      {profileEditPreview}
    </div>;

  function updateProfile() {
    //TODO: update user in db using api
    setIsViewMode(true);
  }

  return (
    <main>
      {isViewMode ? profileView : profileEdit}
    </main>
  )
}

export default Profile;