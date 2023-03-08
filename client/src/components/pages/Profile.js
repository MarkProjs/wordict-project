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

  const profileView =
    <>
      <section className="left-section">
        <UserProfile image={mockImage} />
        <UserRank />
      </section>
      <section className="right-section">
        <div className="top-part">
          <h1 id="username">{mockName}</h1>
          <button onClick={() => setIsViewMode(false)}>Edit profile</button>
        </div>
        <FavoriteWords />
      </section>
    </>;

  const profileEdit =
    <>
      <h1>
        EDIT
      </h1>
      <button onClick={() => setIsViewMode(true)}>Save profile</button>
    </>;

  return (
    <main>
      {isViewMode ? profileView : profileEdit}
    </main>
  )
}

export default Profile;