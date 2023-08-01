import React, { useState} from 'react';
import {CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CCollapse, CButton, CContainer, CRow, CCol} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import './VisualizationStyles.css'

const SpotShootingSection = ({ spotShootingData, selectedPlayerName, selectedPlayerData, spotShootingAverages }) => {

    const dataLabels = {
        0:"Temp Player Id",
        1:"Player Id",
        2:"First Name",
        3:"Last Name",
        4:"Full Name",
        5:"Position", 
        6:"15 Corner Left Makes",
        7:"15 Corner Left Attempts",
        8:"15 Corner Left %",
        9:"15 Break Left Makes",
        10:"15 Break Left Attempts",
        11:"15 Break Left %",
        12:"15 Top Key Makes",
        13:"15 Top Key Attempts",
        14:"15 Top Key %",
        15:"15 Break Right Makes",
        16:"15 Break Right Attempts",
        17:"15 Break Right %",
        18:"15 Corner Right Makes", 
        19:"15 Corner Right Attempt",
        20:"15 Corner Right %",
        21:"College Corner Left Makes",
        22:"College Corner Left Attempts",
        23:"College Corner Left %",
        24:"College Break Left Makes",
        25:"College Break Left Attempts",
        26:"College Break Left %",
        27:"College Top Key Makes",
        28:"College Top Key Attempts",
        29:"College Top Key %",
        30:"College Break Right Makes",
        31:"College Break Right Attempts",
        32:"College Break Right %",
        33:"College Corner Right Makes",
        34:"College Corner Right Attempt",
        35:"College Corner Right %",
        36:"NBA Corner Left Makes",      
        37:"NBA Corner Left Attempts",   
        38:"NBA Corner Left %",          
        39:"NBA Break Left Makes",       
        40:"NBA Break Left Attempts",    
        41:"NBA Break Left %",           
        42:"NBA Top Key Makes",          
        43:"NBA Top Key Attempts",       
        44:"NBA Top Key %",              
        45:"NBA Break Right Makes",      
        46:"NBA Break Right Attempts",   
        47:"NBA Break Right %",          
        48:"NBA Corner Right Makes",     
        49:"NBA Corner Right Attempts",  
        50:"NBA Corner Right %",         
    }

    const dataLabelsForRadarGraph = 
    [
        "15 Corner Left %",
        "15 Break Left %",
        "15 Top Key %",
        "15 Break Right %",
        "15 Corner Right %",
        "College Corner Left %",
        "College Break Left %",
        "College Top Key %",
        "College Break Right %",
        "College Corner Right %",
        "NBA Corner Left %",
        "NBA Break Left %",
        "NBA Top Key %",
        "NBA Break Right %",
        "NBA Corner Right %",
    ]

    const [cleanedSelectedPlayerData, setCleanedSelectedPlayerData] = useState(null);

    const [visible, setVisible] = useState(false);
    const [expandCollapseButtonLabel, setExpandCollpaseButtonLabel] = useState("Expand Spot Shooting Results");

    const handleExpandCollpaseClick = () => {
        setVisible(!visible)
        if (expandCollapseButtonLabel === "Expand Spot Shooting Results")
        {
            setExpandCollpaseButtonLabel("Collapse Spot Shooting Results")
        }
        else
        {
            setExpandCollpaseButtonLabel("Expand Spot Shooting Results")
        }

        const convertedPercentagesData = selectedPlayerData.map((data) => {
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
            <CButton style={{ backgroundColor: '#5d77aa', outline: '3px solid #ffbc1d', margin:'15px', color: 'white'}} onClick={handleExpandCollpaseClick}>{expandCollapseButtonLabel}</CButton>
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
                                    {spotShootingData.slice(6).map((spot, index) => (
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
                                    data: spotShootingAverages,
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

export default SpotShootingSection;
