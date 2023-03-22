import { useEffect, useState } from 'react';
import './Leaderboard.css';

function Leaderboard() {
  const [playerList, setPlayerList] = useState([])

  async function fetchPlayers() {
    // Mock data
    let data = [{ name: "Jacky", elo: 420 }, { name: "Jeremy", elo: 69 }]
    return data
  }

  useEffect(() => {
    (async () => {
      let data = await fetchPlayers();

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