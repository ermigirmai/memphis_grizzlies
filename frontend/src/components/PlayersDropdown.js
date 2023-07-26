import React, { useState, useEffect } from 'react'
import { CFormSelect } from '@coreui/react';

const PlayersDropdown = ({ playerNames, onSelectPlayerName }) => {

    const PLAYER_ID_INDEX = 1;
    const PLAYER_FULLNAME_INDEX = 4;

    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedPlayerPosition, setSelectedPlayerPosition] = useState(null);

    useEffect(() =>
    {
        setSelectedPlayer(null)
    }, [playerNames]);

    const handlePlayerSelect = (event) => {
        //console.log(event.target.options[event.target.selectedIndex].getAttribute('custom_name'))
        const playerPosition = event.target.options[event.target.selectedIndex].getAttribute('custom_name');
        const selectedName = event.target.value;
        setSelectedPlayer(selectedName);
        setSelectedPlayerPosition(playerPosition);
        onSelectPlayerName(selectedName); // Notify the parent component about the selected player
    };

    const generatePlayerNamesList = (playerNames) => {
        return playerNames.map((player) => {
            const playerId = player[PLAYER_ID_INDEX]; // Assuming the player ID is in the first index of the player data array
            const playerName = player[PLAYER_FULLNAME_INDEX]; // Assuming the player's name is in the second index of the player data array
            const playerPosition = player[5]
            return (
                <option key={playerId} value={playerName} id={playerId} custom_name={playerPosition}>
                    {playerName}
                </option>
            );
        });
    };

    return (
        <div>
            <CFormSelect custom_name="playerDropdown" onChange={handlePlayerSelect}>
                <option value="">Select a player...</option>
                {generatePlayerNamesList(playerNames)}
            </CFormSelect>
            {selectedPlayer && selectedPlayerPosition && <div> {selectedPlayer} ({selectedPlayerPosition})</div>}
        </div>
    );
};

export default PlayersDropdown;