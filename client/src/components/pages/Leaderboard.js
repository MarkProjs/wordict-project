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
    <table>
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th>Points</th>
      </tr>
      {playerList.map((player, index) =>
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{player.name}</td>
          <td>{player.elo}</td>
        </tr>
      )}
    </table>
  </>
}

export default Leaderboard;