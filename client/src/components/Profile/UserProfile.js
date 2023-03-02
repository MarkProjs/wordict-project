function UserProfile() {
  let mockImage = "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/" +
    "GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg";
  // might need props to receive image and username, or fetch from db here
  return (
    <article className="profile">
      <img src={mockImage} />
    </article>
  );
}

export default UserProfile;