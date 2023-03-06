import FavoriteWords from "../Profile/FavoriteWords";
import UserProfile from "../Profile/UserProfile";
import UserRank from "../Profile/UserRank";
import './Profile.css';

function Profile() {
  // fetch image, username, favorite words from database
  let mockName = "MonkeyMan420";
  let mockImage = "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/" +
  "GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg";

  return (
    <main>
      <section className="left-section">
        <UserProfile image={mockImage}/>
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