import React, {useState} from 'react';
import {CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CCollapse, CButton, CContainer, CRow, CCol} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import './VisualizationStyles.css'

const NonStationaryShootingSection = ({ nonStationaryShootingData, selectedPlayerName, selectedPlayerData, nonStationaryAverages }) => {

    const dataLabels = {
        0:"Temp Player Id",
        1:"Player Id",
        2:"First Name",
        3:"Last Name",
        4:"Full Name",
        5:"Position", 
        6:"Off Dribble 15 Break Left Makes",
        7:"Off Dribble 15 Break Left Attempts",
        8:"Off Dribble 15 Break Left %",
        9:"Off Dribble 15 Top Key Makes",
        10:"Off Dribble 15 Top Key Attempts",
        11:"Off Dribble 15 Top Key %",
        12:"Off Dribble 15 Break Right Makes",
        13:"Off Dribble 15 Break Right Attempts",
        14:"Off Dribble 15 Break Right %",
        15:"Off Dribble College Break Left Makes",
        16:"Off Dribble College Break Left Attempts",
        17:"Off Dribble College Break Left %",
        18:"Off Dribble College Top Key Makes",
        19:"Off Dribble College Top Key Attempts",
        20:"Off Dribble College Top Key %",
        21:"Off Dribble College Break Right Makes",
        22:"Off Dribble College Break Right Attempts",
        23:"Off Dribble College Break Right %",
        24:"On Move 15 Makes",
        25:"On Move 15 Attempts",
        26:"On Move 15 %",
        27:"On Move College Makes",
        28:"On Move College Attempts",
        29:"On Move College %"
    }

    const dataLabelsForRadarGraph = 
    [
        "Off Dribble 15 Break Left",
        "Off Dribble 15 Top Key",
        "Off Dribble 15 Break Right",
        "Off Dribble College Break Left",
        "Off Dribble College Top Key",
        "Off Dribble College Break Right",
        "On Move 15",
        "On Move College"
    ]

    const [cleanedSelectedPlayerData, setCleanedSelectedPlayerData] = useState(null);

    const [visible, setVisible] = useState(false);
    const [expandCollapseButtonLabel, setExpandCollpaseButtonLabel] = useState("Expand Non-Stationary Shooting Results");

    const handleExpandCollpaseClick = () => {
        console.log(nonStationaryShootingData)
        setVisible(!visible)
        if (expandCollapseButtonLabel === "Expand Non-Stationary Shooting Results")
        {
            setExpandCollpaseButtonLabel("Collapse Non-Stationary Shooting Results")
        }
        else
        {
            setExpandCollpaseButtonLabel("Expand Non-Stationary Shooting Results")
        }

        const convertedPercentagesData = selectedPlayerData.map((data) =>
        {
            if (data === null || data === "")
            {
                return 0;
            }
            else{
                var [startNum, endNum] = data.split('-');
                var startValue = parseInt(startNum, 10);
                var endValue = parseInt(endNum, 10);
                return (startValue / endValue) * 100;
            }
        })
        setCleanedSelectedPlayerData(convertedPercentagesData)
    }

    return (
        <div className="section" style={{backgroundColor: '#fafafa'}}>
            <CButton style={{ backgroundColor: '#5d76a9', outline: '3px solid #ffbc1d', margin:'15px', color: 'white'}} onClick={handleExpandCollpaseClick}>{expandCollapseButtonLabel}</CButton>
            <CCollapse visible={visible}>
                <CContainer>
                    <CRow>
                        <CCol>
                            <CTable striped hover bordered>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Shooting Spot</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Shooting Result</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {nonStationaryShootingData.slice(6).map((spot, index) => (
                                        <CTableRow key={index+6}>
                                            <CTableDataCell>{dataLabels[index+6]}</CTableDataCell> 
                                            <CTableDataCell>{spot === null || spot === "" ? "-" : spot}</CTableDataCell> 
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCol>  
                        <CCol>
                            <CChart 
                            type="radar"
                            data={{
                                labels: dataLabelsForRadarGraph,
                                datasets: [
                                {
                                    label: selectedPlayerName,
                                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                                    borderColor: '#ffbc1d',
                                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                                    pointBorderColor: '#fff',
                                    pointHighlightFill: '#fff',
                                    pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                                    data: cleanedSelectedPlayerData,
                                },
                                {
                                    label: 'Combine Average',
                                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                                    borderColor: 'rgba(151, 187, 205, 1)',
                                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                                    pointBorderColor: '#fff',
                                    pointHighlightFill: '#fff',
                                    pointHighlightStroke: 'rgba(151, 187, 205, 1)',
                                    data: nonStationaryAverages,
                                },
                                ],
                            }}
                            options={{
                                plugins: {
                                legend: {
                                    labels: {
                                    color: '#5d77aa',
                                    }
                                }
                                },
                                scales: {
                                r: {
                                    grid: {
                                    color: '#5d77aa',
                                    },
                                    ticks: {
                                    color: '#5d77aa',
                                    },
                                },
                                },
                            }}
                            />
                        </CCol>  
                    </CRow>
                </CContainer>
                <p>*Note: If any data cell has a "-" this indicates the player did not participate in this portion of the combine.</p>
            </CCollapse>
        </div>
    );
};

export default NonStationaryShootingSection;
