import FavoriteWords from "../Profile/FavoriteWords";
import UserProfile from "../Profile/UserProfile";
import UserRank from "../Profile/UserRank";
import './Profile.css';

function Profile() {
  // fetch image, username, favorite words from database
  let mockName = "MonkeyMan420";

  return (
    <main>
      <section className="left-section">
        <UserProfile />
        <UserRank />
      </section>
      <section className="right-section">
        <div className="top-part">
          <h1 id="username">{mockName}</h1>
          <button>Edit profile</button>
        </div>
        <FavoriteWords />
      </section>
    </main>
  )
}

export default Profile;