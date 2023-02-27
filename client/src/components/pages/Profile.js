import FavoriteWords from "../Profile/FavoriteWords";
import UserProfile from "../Profile/UserProfile";
import UserRank from "../Profile/UserRank";

function Profile() {
  // fetch image, username, favorite words from database

  return (
    <main>
      <h1>My Profile</h1>
      <UserProfile />
      <FavoriteWords />
      <UserRank />
    </main>
  )
}

export default Profile;