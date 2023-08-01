import React, {useState, useEffect} from 'react';
import { CSpinner } from '@coreui/react';

import './App.css';
import './components/PlayerWatchList.css'
import './components/Constants.js';

import Header from './components/Header';
import YearDropdown from './components/YearDropdown';
// import SearchBar from './components/SearchBar';
import PlayersDropdown from './components/PlayersDropdown';
// import ComparePlayers from './components/ComparePlayers';
// import PlayerWatchList from './components/PlayerWatchList';

import DrillResultsSection from './components/DrillResultsSection';
import SpotShootingSection from './components/SpotShootingSection';
import NonStationaryShootingSection from './components/NonStationaryShootingSection';
import PlayerAnthroSection from './components/PlayerAnthroSection';

function App(){
  
  const [loading, setLoading] = useState(false);

  const years = ["Select Year", "2023", "2022", "2021", "2020", "2019"];

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState(null);

  const [selectedPlayersWatchList, setSelectedPlayersWatchList] = useState([]);

  const [selectedPlayerDrillResults, setSelectedPlayerDrillResults] = useState(null);
  const [selectedPlayerSpotShooting, setSelectedPlayerSpotShooting] = useState(null);
  const [selectedPlayerNonShooting, setSelectedPlayerNonShooting] = useState(null);
  const [selectedPlayerAnthro, setSelectedPlayerAnthro] = useState(null);

  const [playerCombineStatsAverages, setPlayerCombineStatsAverages] = useState(null);
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
    setSelectedPlayerName(selectedPlayerName)

    const selectedPlayerData = playerCombineStats.find((player) => player[1] == selectedPlayerId);
    setSelectedPlayer(selectedPlayerData);

    const selectedPlayerDrillResultsData = playerDrillResults.find((player) => player[1] == selectedPlayerId);
    setSelectedPlayerDrillResults(selectedPlayerDrillResultsData);

    const selectedPlayerSpotShootingData = playerSpotShooting.find((player) => player[1] == selectedPlayerId);
    setSelectedPlayerSpotShooting(selectedPlayerSpotShootingData);

    const selectedPlayerNonStationaryData = playerNonStationaryShooting.find((player) => player[1] == selectedPlayerId);
    setSelectedPlayerNonShooting(selectedPlayerNonStationaryData);

    const selectedPlayerAnthroData = playerAnthro.find((player) => player[1] == selectedPlayerId);
    setSelectedPlayerAnthro(selectedPlayerAnthroData);

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

  const handlePlayerAdd = (player) => {
    setSelectedPlayersWatchList((prevPlayers) => [...prevPlayers, player]);
  };

  const computeCombineAverages = (data) => {
    const numPlayers = data.length;

    const sumArray = new Array(47).fill(0);
    const indexArray = new Array(47).fill(0);
    const avgArray = new Array(47).fill(0);

    for (const player of data){
      for (var i = 6; i<47; i++)
      {
        if ((i == 6 || i == 8 || i == 11 || i == 13 || i == 15 || i == 16 || i == 17 || i == 18 || i == 19 || i == 20 || i == 21 || i == 22)
            && player[i] != null && player[i] != undefined)
        {
          sumArray[i] = sumArray[i] + player[i];
          indexArray[i]++;
        }
        else if (i == 10 && player[i] != null && player[i] != undefined && player[i] != "") 
        {
          var weight_int = parseFloat(player[i])
          sumArray[i] = sumArray[i] + weight_int
          indexArray[i]++;
        }
        else if (i > 24 && i < 47 && player[i] != null && player[i] != undefined && player[i] != "")
        {
          var [startNum, endNum] = player[i].split('-');
          var startValue = parseInt(startNum, 10);
          var endValue = parseInt(endNum, 10);

          sumArray[i] = sumArray[i] + ((startValue / endValue) * 100);
          indexArray[i]++;
        }
      }
    }

    for (let i=6; i<47; i++)
    {
      if (sumArray[i] > 0)
      {
        avgArray[i] = sumArray[i]/indexArray[i];
      }
    }
    setPlayerCombineStatsAverages(avgArray)
  }

  useEffect(() => {
    setLoading(true);

    fetch("/combinestats?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        const playerData = data['resultSets'][0]['rowSet']
        setPlayerCombineStats(data['resultSets'][0]['rowSet'])
        computeCombineAverages(playerData)
      }
    )

    fetch("/drillresults?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        setPlayerDrillResults(data['resultSets'][0]['rowSet'])
      }
    )

    fetch("/spotshooting?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        setPlayerSpotShooting(data['resultSets'][0]['rowSet'])
      }
    )

    fetch("/nonstationaryshooting?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        setPlayerNonStationaryShooting(data['resultSets'][0]['rowSet'])
      }
    )

    fetch("/playeranthro?year="+selectedYear).then(
      res => res.json()
    ).then(
      data => {
        setPlayerAnthro(data['resultSets'][0]['rowSet'])
      }
    )

    setLoading(false);

  }, [selectedYear]);

  return (
    <div style={{ backgroundColor: '#f3f5f6'}}>
        <Header />
        {/* <PlayerWatchList/> */}
        <div>
        <YearDropdown years={years} selectedYear={selectedYear} onChange={handleYearChange} />
        {/* <SearchBar onSearch={handleSearch} /> */}
        {loading ? (
          <CSpinner color="primary" size="lg" className="spinner" />
        ) : (
          <PlayersDropdown size="lg" playerNames={playerCombineStats} onSelectPlayerName={handlePlayerSelected} handlePlayerAddToWatchList={handlePlayerAdd}/>
          )}
        {selectedPlayer && (
          <div style={{ backgroundColor: '#f3f5f6'}}>
            <DrillResultsSection drillResultsData={selectedPlayerDrillResults} selectedPlayerName={selectedPlayerName} drillResultAverages={playerCombineStatsAverages.slice(18, 24)}/>
            <SpotShootingSection spotShootingData={selectedPlayerSpotShooting} selectedPlayerName={selectedPlayerName} selectedPlayerData={selectedPlayer.slice(24,39)} spotShootingAverages={playerCombineStatsAverages.slice(24, 39)}/>
            <NonStationaryShootingSection nonStationaryShootingData={selectedPlayerNonShooting} selectedPlayerName={selectedPlayerName} selectedPlayerData={selectedPlayer.slice(39,47)} nonStationaryAverages={playerCombineStatsAverages.slice(39,47)}/>
            <PlayerAnthroSection playerAnthroData={selectedPlayerAnthro} selectedPlayerName={selectedPlayerName} selectedPlayerData={selectedPlayer.slice(6,18)} anthroAverages={playerCombineStatsAverages.slice(6, 18)}/>
          </div>
        )}
        </div>
        {/* <ComparePlayers /> */}
    </div>
  );
};

export default App;
