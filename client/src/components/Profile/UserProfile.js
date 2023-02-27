function UserProfile(props) {
  // might need props to receive image and username, or fetch from db here
  return (
    <section className="profile">
      <img style={{ width: 100, height: 100 }} src={props.image} />
      <p id="username">{props.name}</p>
    </section>
  );
}

export default UserProfile;