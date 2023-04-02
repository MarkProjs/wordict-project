function UserProfile(props) {
  // might need props to receive image and username, or fetch from db here
  return (
    <article className="profile">
      <img src={props.image} alt="user profile picture" referrerPolicy="no-referrer"/>
    </article>
  );
}

export default UserProfile;