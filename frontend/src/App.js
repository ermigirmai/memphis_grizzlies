import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import YearDropdown from './components/YearDropdown';
import SearchBar from './components/SearchBar';
import PlayersDropdown from './components/PlayersDropdown';
import ComparePlayers from './components/ComparePlayers';

import DrillResultsSection from './components/DrillResultsSection';
import SpotShootingSection from './components/SpotShootingSection';
import NonStationaryShootingSection from './components/NonStationaryShootingSection';
import PlayerAnthroSection from './components/PlayerAnthroSection';

function App(){
  const years = ["2019", "2020", "2021", "2022", "2023"];
  const PLAYER_ID_INDEX = 1;

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [playerCombineStatsAnthroAverage, setPlayerCombineStatsAnthroAverage] = useState([{}])
  const [playerCombineStatsDrillAverage, setPlayerCombineStatsDrillAverage] = useState([{}])
  const [playerCombineStatsSpotShootingAverage, setPlayerCombineStatsSpotShootingAverage] = useState([{}])
  const [playerCombineStatsNonStationaryAverage, setPlayerCombineStatsNonStationaryAverage] = useState([{}])

  const [playerCombineStats, setPlayerCombineStats] = useState([{}]);
  const [playerDrillResults, setPlayerDrillResults] = useState([{}])
  const [playerSpotShooting, setPlayerSpotShooting] = useState([{}])
  const [playerNonStationaryShooting, setPlayerNonStationaryShooting] = useState([{}])
  const [playerAnthro, setPlayerAnthro] = useState([{}])

  const handleYearChange = (year) => {
    setSelectedPlayer(null)
    setSelectedYear(year);
  };

  const handlePlayerSelected = (selectedPlayerName, selectedPlayerId) =>
  {
    const selectedPlayerData = playerCombineStats.find((player) => player[PLAYER_ID_INDEX] == selectedPlayerId);

    setSelectedPlayer(selectedPlayerData);
  }

  const handleSearch = (searchTerm) => {
    // Filtering logic here using the 'searchTerm'
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
        setPlayerCombineStats(data['resultSets'][0]['rowSet'])
        //console.log("comb", data['resultSets'][0]['rowSet'][5])
      }
    )

    fetch("/drillresults?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        //console.log("drill", data['resultSets'][0]['rowSet'][5])
        setPlayerDrillResults(data['resultSets'][0]['rowSet'])
      }
    )

    fetch("/spotshooting?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        //console.log("spot", data['resultSets'][0]['rowSet'][5])
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
            <SearchBar onSearch={handleSearch} />
            <PlayersDropdown playerNames={playerCombineStats} onSelectPlayerName={handlePlayerSelected}/>
            {selectedPlayer && (
              <div>
                <DrillResultsSection drillResultsData={selectedPlayer}/>
                <SpotShootingSection spotShootingData={selectedPlayer}/>
                <NonStationaryShootingSection nonStationaryShootingData={selectedPlayer}/>
                <PlayerAnthroSection playerAnthroData={selectedPlayer}/>
              </div>
            )}
            <ComparePlayers />            
    </div>
  );
};

export default App;
