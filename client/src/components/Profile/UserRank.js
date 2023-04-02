function UserRank(props) {
  return (
    <article className="rank">
      <h3>Rank Points</h3>
      <h2>{props.elo}</h2>
    </article>
  );
}

export default UserRank;