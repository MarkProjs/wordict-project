function Profile(props){
  return (
    <main>
      <h1>My Profile</h1>
      <section>
        <img style={{width: 100, height: 100}} src={props.image}/>
        <p id="username">{props.name}</p>
      </section>
    </main>
  )
}

export default Profile;