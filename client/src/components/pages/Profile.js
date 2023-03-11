import { useState } from 'react';
import FavoriteWords from "../Profile/FavoriteWords";
import UserProfile from "../Profile/UserProfile";
import UserRank from "../Profile/UserRank";
import './Profile.css';

function Profile() {
  const [isViewMode, setIsViewMode] = useState(true);
  // fetch image, username, favorite words from database
  let mockName = "MonkeyMan420";
  let mockImage = "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/" +
    "GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg";
  const [profilePicture, setProfilePicture] = useState(mockImage);
  const [profileName, setProfileName] = useState(mockName);
  const [previousProfileName, setPreviousProfileName] = useState("");

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
        <form onSubmit={updateProfile} className="edit-form">
          <h2>
            Edit Profile
          </h2>
          <label>Name: </label>
          <input id="username" type="text" name="username" defaultValue={profileName}
            onChange={(e) => setProfileName(e.target.value)} />
          <br />
          <label>Change profile picture: </label>
          <input type="file" name="file" accept="image/*"
            onChange={(e) => setProfilePicture(window.URL.createObjectURL(e.target.files[0]))} />

          <br />
          <input type="submit" value="Save" className="form-buttons" />
          <button className="form-buttons" onClick={() => {
            setProfileName(previousProfileName);
            setIsViewMode(true);
          }}>Cancel</button>
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