import './Home.css';

function Home() {
  return(
    <div className='home'>
      <div className="intro">
        <h1>Welcome To WordDict!</h1>
        <h2>Here is a guide to maximize the experience in the website:</h2>
      </div>
      <div className="guideList">
        <li>
          You can go to <a href="/dict">Dictionary</a> to search for a word!
        </li>
        <li>Play <a href="/wordle">Wordle</a>!</li>
        <li>Test your skills against another player in <a href="">Wordle Online</a>!</li>
        <li>Check your ranking in <a href="">Leaderboard</a>!</li>
        <li><a href="/about">About Us</a></li>
      </div>
    </div>
  );
}
export default Home;