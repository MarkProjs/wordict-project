import FavoriteWords from "../Profile/FavoriteWords";
import UserProfile from "../Profile/UserProfile";
import UserRank from "../Profile/UserRank";

function Profile() {
  // fetch image, username, favorite words from database
  let mockName = "username";

  return (
    <main>
      <section className="left-section">
        <UserProfile />
        <UserRank />
      </section>
      <section className="right-section">
        <h1 id="username">{mockName}</h1>
        <FavoriteWords />
      </section>
    </main>
  )
}

export default Profile;