import { useState, useEffect } from 'react';
import FavoriteWords from "../Profile/FavoriteWords";
import UserProfile from "../Profile/UserProfile";
import UserRank from "../Profile/UserRank";
import './Profile.css';
import FetchModule from '../../controllers/FetchModule';

function Profile() {
  const placeholderName = "Loading..."
  const placeholderPicture = process.env.PUBLIC_URL + '/img/profile_placeholder.png';
  const [email, setEmail] = useState("");
  const [profileName, setProfileName] = useState(placeholderName);
  const [profilePicture, setProfilePicture] = useState(placeholderPicture);
  const [previousProfileName, setPreviousProfileName] = useState("");
  const [previousProfilePicture, setPreviousProfilePicture] = useState("");
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [isViewMode, setIsViewMode] = useState(true);

  useEffect(() => {
    (async () => {
      // Fetch user from database
      let data = await FetchModule.fetchUser();
      setProfileName(data[0].name);
      setProfilePicture(data[0].image);
      setEmail(data[0].email);
      setFavoriteWords(data[0].favoriteWords);
    })();
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
            // set current profile picture as previous to be used on cancel
            setPreviousProfilePicture(profilePicture);
            // set to edit mode
            setIsViewMode(false);
          }}>Edit profile</button>
        </div>
        <FavoriteWords favoriteWords={favoriteWords} setFavoriteWords={setFavoriteWords}/>
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
        <form onSubmit={async (e) => await updateProfile(e)} className="edit-form">
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
            <button type="submit">Save</button>
            <button type="button" onClick={() => {
              // reset profile name using previous
              setProfileName(previousProfileName);
              // reset profile picture using previous
              setProfilePicture(previousProfilePicture);
              // set to view mode
              setIsViewMode(true);
            }}>Cancel</button>
          </div>
        </form>
      </section>
      {profileEditPreview}
    </div>;

  async function updateProfile(e) {
    e.preventDefault();
    // check if any changes were made to prevent unnecessary api calls
    if (profileName !== previousProfileName || profilePicture !== previousProfilePicture) {   
      // form data in json
      let formData = JSON.stringify({email: email, name: profileName, picture: profilePicture});
      await FetchModule.updateUser(formData);
    }
    setIsViewMode(true);
  }

  return (
    <main>
      {isViewMode ? profileView : profileEdit}
    </main>
  )
}

export default Profile;