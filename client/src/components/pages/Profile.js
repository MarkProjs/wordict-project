// most likely going to remove props
function Profile(props) {
  const mockData = [{ word: 'one' }, { word: 'happy' }, { word: 'rooty' }];

  // fetch image, username, favorite words from database

  return (
    <main>
      <h1>My Profile</h1>
      <section className="profile">
        <img style={{ width: 100, height: 100 }} src={props.image} />
        <p id="username">{props.name}</p>
      </section>
      <section className="favorites">
        <ul>
          {mockData.map((item, key) =>
            <li key={key}>
              <a href={"/" + item.word + "/definition"}>{item.word}</a>
            </li>)}
        </ul>
      </section>
      <section className="rank">
        <p>Leaderboard rank: #1</p>
      </section>
    </main>
  )
}

export default Profile;