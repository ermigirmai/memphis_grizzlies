import React, {useEffect, useState} from 'react';
import {CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CCollapse, CButton, CContainer, CRow, CCol} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import './VisualizationStyles.css'

const PlayerAnthroSection = ({ playerAnthroData, selectedPlayerName, selectedPlayerData, anthroAverages }) => {

    const dataLabels = {
        0:"Temp Player Id",
        1:"Player Id",
        2:"First Name",
        3:"Last Name",
        4:"Full Name",
        5:"Position", 
        6:"Height Without Shoes (in.)",
        7:"Height Without Shoes (Feet/Inches)",
        8:"Height With Shoes (in.)",
        9:"Height With Shoes (Feet/Inches)",
        10:"Weight (lbs)",
        11:"Wingspan (in.)",
        12:"Wingspan (Feet/Inches)",
        13:"Standing Reach (in.)",
        14:"Standing Reach (Feet/Inches)",
        15:"Body Fat (%)",
        16:"Hand-Length (in.)",
        17:"Hand-Width (in.)"
    }

    const dataLabelsForRadarGraph = 
    [
        "Height w/o Shoes",
        "Height w/ Shoes",
        "Weight",
        "Wingspan",
        "Standing Reach",
        "Body Fat",
        "Hand-Length",
        "Hand-Width"
    ]

    const [cleanedSelectedPlayerData, setCleanedSelectedPlayerData] = useState(null);
    const [cleanedAveragesAnthroData, setCleanedAveragesAnthroData] = useState(null);

    const [visible, setVisible] = useState(false);
    const [expandCollapseButtonLabel, setExpandCollpaseButtonLabel] = useState("Expand Medical Anthro Measurements");

    const handleExpandCollpaseClick = () => {
        console.log(anthroAverages)
        setVisible(!visible)
        if (expandCollapseButtonLabel === "Expand Medical Anthro Measurements")
        {
            setExpandCollpaseButtonLabel("Collapse Medical Anthro Measurements")
        }
        else
        {
            setExpandCollpaseButtonLabel("Expand Medical Anthro Measurements")
        }

        const cleanedPlayerData = selectedPlayerData.map((data, index) =>
        {
            if (index == 1 || index == 3 || index == 6 || index == 8)
            {
                return undefined
            }
            else if (index == 4)
            {
                return parseFloat(data)
            }
            else
            {
                return data
            }
        }).filter((data) => data !== undefined);

        const cleanAveragesData = anthroAverages.map((data, index) =>
        {
            if (index == 1 || index == 3 || index == 6 || index == 8)
            {
                return undefined
            }
            else
            {
                return data
            }
        }).filter((data) => data !== undefined);

        setCleanedSelectedPlayerData(cleanedPlayerData)
        setCleanedAveragesAnthroData(cleanAveragesData)
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
                                        <CTableHeaderCell scope="col">Anthro Category</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Anthro Measurement</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {playerAnthroData.slice(6).map((data, index) => (
                                        <CTableRow key={index+6}>
                                            <CTableDataCell>{dataLabels[index+6]}</CTableDataCell> 
                                            <CTableDataCell>{data === null || data === "" ? "-" : data}</CTableDataCell> 
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
                                    data: cleanedAveragesAnthroData,
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

export default PlayerAnthroSection;
