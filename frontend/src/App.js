import React, {useState, useEffect} from 'react';

import Header from './components/Header';
import YearDropdown from './components/YearDropdown';
import SearchBar from './components/SearchBar';
import PlayersDropdown from './components/PlayersDropdown';

function App(){
  const years = ["2019", "2020", "2021", "2022", "2023"];

  const [playerNames, setPlayerNames] = useState([]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const [playerCombineStats, setPlayerCombineStats] = useState([{}]);
  const [playerDrillResults, setPlayerDrillResults] = useState([{}])
  const [playerSpotShooting, setPlayerSpotShooting] = useState([{}])
  const [playerNonStationaryShooting, setPlayerNonStationaryShooting] = useState([{}])
  const [playerAnthro, setPlayerAnthro] = useState([{}])

  const handleYearChange = (year) => {
    setSelectedYear(year);
    // Perform any actions you need based on the selected year (e.g., API call)
  };

  const handlePlayerNameSelect = (selectedPlayerName) => {
    console.log('App.js::Selected Player: ', selectedPlayerName)
  }

  const handleSearch = (searchTerm) => {
    // Your filtering logic here using the 'searchTerm'
    // Example: Filter the playerData array based on the player's name
    const filteredPlayers = playerCombineStats.filter(
      (player) =>
        player[2] && player[2].toLowerCase().includes(searchTerm.toLowerCase()) // Assuming the player's name is in the second index of the player data array
    );
    // Update the player data state with the filtered results
    setPlayerCombineStats(filteredPlayers);
  };

  useEffect(() => {
    fetch("/combinestats?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        setPlayerCombineStats(data)
        setPlayerNames(data['resultSets'][0]['rowSet'])
        //console.log(data['resultSets'][0]['rowSet'])
      }
    )

    fetch("/drillresults?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        console.log(data['resultSets'][0]['rowSet'])
        setPlayerDrillResults(data['resultSets'][0]['rowSet'])
      }
    )

    fetch("/spotshooting?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        //console.log(data['resultSets'][0]['rowSet'])
        setPlayerSpotShooting(data['resultSets'][0]['rowSet'])
      }
    )

    fetch("/nonstationaryshooting?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        //console.log(data['resultSets'][0]['rowSet'])
        setPlayerNonStationaryShooting(data['resultSets'][0]['rowSet'])
      }
    )

    fetch("/playeranthro?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        //console.log(data['resultSets'][0]['rowSet'])
        setPlayerAnthro(data['resultSets'][0]['rowSet'])
      }
    )
  }, [selectedYear]);

  return (
    <div>
      <Header />
      <YearDropdown years={years} selectedYear={selectedYear} onChange={handleYearChange} />
      <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch function to the SearchBar */}
      <PlayersDropdown playerNames={playerNames} onSelectPlayerName={handlePlayerNameSelect}/>
    </div>
  );
};

export default App;
