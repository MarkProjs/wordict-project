import './Home.css';

function Home() {
  return(
    <div className='home'>
      <div className="intro">
        <h1>Welcome To WordDict!</h1>
        <p className="motto">Search.</p>
        <p className="motto">Play.</p>
        <p className="motto">Learn.</p>
      </div>
      <div className="guideList">
        <h2>Here is a guide to maximize the experience in the website:</h2>
        <ul>
          <li className="guide1">
            You can go to&nbsp;<a href="/dict">Dictionary</a>&nbsp;to search for a word!
          </li>
          <li className="guide2">Play&nbsp;<a href="/wordle">Wordle</a>!</li>
          <li className="guide3">
            Test your skills against another player in&nbsp;<a href="">Wordle Online</a>!
          </li>
          <li className="guide4">Check your ranking in&nbsp;<a href="">Leaderboard</a>!</li>
          <li className="guide5"><a href="/about">About Us</a></li>
        </ul>
      </div>
    </div>
  );
}
export default Home;