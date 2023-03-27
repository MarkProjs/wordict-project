import { useEffect, useState } from 'react';
import './Leaderboard.css';
import FetchModule from '../../controllers/FetchModule';


function Leaderboard() {
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    (async () => {
      let data = await FetchModule.fetchAllUsers();

      setPlayerList(data);
    })();
  }, []);

  return <>
    <h1>Leaderboard</h1>
    <div className='leaderboard'>
      <div className='row'>
        <div>Rank</div>
        <div>Player</div>
        <div>Points</div>
      </div>
      {playerList.map((player, index) =>
        <div key={index} className='row'>
          <div>{index + 1}</div>
          <div>{player.name}</div>
          <div>{player.elo}</div>
        </div>
      )}
    </div>
  </>
}

export default Leaderboard;