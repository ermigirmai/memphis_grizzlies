import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardText, CCardTitle, CFormSelect, CButton } from '@coreui/react';

const PlayersDropdown = ({ playerNames, onSelectPlayerName, handlePlayerAddToWatchList }) => {

    const PLAYER_ID_INDEX = 1;
    const PLAYER_FULLNAME_INDEX = 4;
    const PLAYER_POSITION_INDEX = 5;

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
        const selectedPlayerId = event.target.options[event.target.selectedIndex].getAttribute('id');

        console.log("name:", selectedName, "id:", selectedPlayerId)
        setSelectedPlayer(selectedName);
        setSelectedPlayerPosition(playerPosition);
        onSelectPlayerName(selectedName, selectedPlayerId); // Notify the parent component about the selected player
    };

    const generatePlayerNamesList = (playerNames) => {
        var key_value = 0;
        return playerNames.map((player) => {
            const playerId = player[PLAYER_ID_INDEX]; // Assuming the player ID is in the first index of the player data array
            const playerName = player[PLAYER_FULLNAME_INDEX]; // Assuming the player's name is in the second index of the player data array
            const playerPosition = player[PLAYER_POSITION_INDEX]
            key_value++;
            return (
                <option key={key_value} value={playerName} id={playerId} custom_name={playerPosition}>
                    {playerName}
                </option>
            );
        });
    };

    const handleAddPlayer = (playerName) => {
        // Call the function passed from App.js to add the player to the left pane menu
        handlePlayerAddToWatchList(playerName);
    };

    return (
        <div>
            <CFormSelect custom_name="playerDropdown" size="lg" onChange={handlePlayerSelect} style={{ width: '500px', margin: '15px auto', backgroundColor: '#5d77aa', outline: '2px solid #ffbc1d', color: 'white'}}>
                <option value="">Select Player</option>
                {generatePlayerNamesList(playerNames)}
            </CFormSelect>
            {
                selectedPlayer && selectedPlayerPosition && 
                <div style={{ margin: '50px' }}> 
                    <CCard style={{ width: '20rem', height: '15rem', backgroundColor:'white', outline: '2px solid #5d77aa', color: '#5d77aa'}}>
                        <CCardBody>
                            <CCardTitle style={{fontSize:'28px'}}>{selectedPlayer}</CCardTitle>
                            <CCardText style={{ color: '#ffbc1d', fontSize:'20px'}}>{selectedPlayerPosition}</CCardText>
                            <CButton style={{ borderRadius: '0px', backgroundColor: '#ffbc1d', color: '#5d77aa'}} onClick={() => handleAddPlayer(selectedPlayer)}>Add to watchlist</CButton> {/* Add the onClick event for the add icon */}
                        </CCardBody>
                    </CCard>
                </div>
            }
        </div>
    );
};

export default PlayersDropdown;