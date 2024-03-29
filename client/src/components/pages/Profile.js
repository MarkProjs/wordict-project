import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import FavoriteWords from "../Profile/FavoriteWords";
import UserProfile from "../Profile/UserProfile";
import UserRank from "../Profile/UserRank";
import './Profile.css';
import FetchModule from '../../controllers/FetchModule';
import UserContext from '../../userContext';

function Profile() {
  const placeholderName = "Loading..."
  const placeholderPicture = process.env.PUBLIC_URL + '/img/profile_placeholder.png';
  const [profileName, setProfileName] = useState(placeholderName);
  const [profilePicture, setProfilePicture] = useState(placeholderPicture);
  const [previousProfileName, setPreviousProfileName] = useState("");
  const [previousProfilePicture, setPreviousProfilePicture] = useState("");
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [userElo, setUserElo] = useState();
  const [isViewMode, setIsViewMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // Fetch user from database
      let data = await FetchModule.fetchUser();
      let favs = await FetchModule.fetchUserFavorites();
      setProfileName(data.name);
      setProfilePicture(data.picture);
      setFavoriteWords(favs.favoriteWords);
      setUserElo(data.elo);
      setIsLoading(false);
    })();
    if (!user.isLoggedIn) {
      navigate("/");
    }
  }, []);

  // view user profile
  const profileView =
    <>
      <section className="left-section">
        <UserProfile image={profilePicture} />
        <UserRank elo={userElo} />
      </section>
      <section className="right-section">
        <div className="top-part">
          <h1 className="name">{profileName}</h1>
          <button disabled={isLoading} onClick={() => {
            // set current profile name as previous to be used on cancel
            setPreviousProfileName(profileName);
            // set current profile picture as previous to be used on cancel
            setPreviousProfilePicture(profilePicture);
            // set to edit mode
            setIsViewMode(false);
          }}>Edit profile</button>
        </div>
        <FavoriteWords favoriteWords={favoriteWords} setFavoriteWords={setFavoriteWords} />
      </section>
    </>;

  // preview edited user profile
  const profileEditPreview =
    <section className="preview-section">
      <p>Quick Preview:</p>
      <article>
        <img alt="profile picture" src={profilePicture} referrerPolicy="no-referrer" />
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
            onChange={(e) => {
              const name = e.target.value;
              setIsValidName(name.match(/^(?=.{1,50}$)[^\W_]+[_\- ]?[^\W_]+$/));

              setProfileName(name);
            }} />
          {
            !isValidName && <ul className='error'>
              <li>Must be between 2 and 50 characters</li>
              <li>Can only containe letters, numbers, underscores, spaces and hyphens</li>
              <li>Cannot begin or end with underscores, spaces and hyphens</li>
              <li>Cannot have multiple underscores, spaces and hyphens in a row</li>
            </ul>
          }
          <br />
          <label>Change profile picture: </label>
          <input type="file" name="file" accept="image/*"
            // allow profile picture change preview
            onChange={(e) => setProfilePicture(window.URL.createObjectURL(e.target.files[0]))} />
          <br />
          <div className="form-buttons">
            <button disabled={isLoading || !isValidName} type="submit">Save</button>
            <button disabled={isLoading} type="button" onClick={() => {
              // reset profile name using previous
              setProfileName(previousProfileName);
              // reset profile picture using previous
              setProfilePicture(previousProfilePicture);
              // set to view mode
              setIsViewMode(true);
              setIsValidName(true);
            }}>Cancel</button>
          </div>
        </form>
      </section>
      {profileEditPreview}
    </div>;

  async function updateProfile(e) {
    setIsLoading(true);
    e.preventDefault();
    let nameChanged = profileName !== previousProfileName;
    let pictureChanged = profilePicture !== previousProfilePicture;
    // check if any changes were made to prevent unnecessary api calls
    if (nameChanged || pictureChanged) {
      // form data in json
      let formData = new FormData();
      formData.append('file', e.target.file.files[0]);
      formData.append('name', profileName);
      // let formData = { name: profileName, picture: profilePicture };
      await FetchModule.updateUser(formData, nameChanged, pictureChanged);
    }
    setIsLoading(false)
    setIsViewMode(true);
  }

  return (
    <main>
      {isViewMode ? profileView : profileEdit}
    </main>
  )
}

export default Profile;