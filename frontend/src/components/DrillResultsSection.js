import React, {useState} from 'react';
import {CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CCollapse, CButton, CContainer, CRow, CCol} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import './VisualizationStyles.css'

const DrillResultsSection = ({ drillResultsData, selectedPlayerName, drillResultAverages }) => {

    const dataLabels = {
        0:"Temp Player Id",
        1:"Player Id",
        2:"First Name",
        3:"Last Name",
        4:"Full Name",
        5:"Position", 
        6:"Standing Vertical Leap",
        7:"Max Vertical Leap",
        8:"Lane Agility Time",
        9:"Modified Lane Agility Time",
        10:"Three Quarter Sprint",
        11:"Bench Press"
    }

    const dataLabelsForRadarGraph = 
    [
        "Standing Vertical Leap",
        "Max Vertical Leap",
        "Lane Agility Time",
        "Modified Lane Agility Time",
        "Three Quarter Sprint",
        "Bench Press"
    ]

    const [cleanedSelectedPlayerData, setCleanedSelectedPlayerData] = useState(null);

    const [visible, setVisible] = useState(false);
    const [expandCollapseButtonLabel, setExpandCollpaseButtonLabel] = useState("Expand Drill Results");

    const handleExpandCollpaseClick = () => {
        console.log("avg",drillResultAverages)
        console.log("data", drillResultsData)
        setVisible(!visible)
        if (expandCollapseButtonLabel === "Expand Drill Results")
        {
            setExpandCollpaseButtonLabel("Collapse Drill Results")
        }
        else
        {
            setExpandCollpaseButtonLabel("Expand Drill Results")
        }

        const cleanedData = drillResultsData.slice(6).map((data) =>
        {
            if (data === null || data === "")
            {
                return 0;
            }
            else{
                return data;
            }
        })
        setCleanedSelectedPlayerData(cleanedData)
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
                                        <CTableHeaderCell scope="col">Drill Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Drill Result</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {drillResultsData.slice(6).map((drill, index) => (
                                        <CTableRow key={index+6}>
                                            <CTableDataCell>{dataLabels[index+6]}</CTableDataCell> 
                                            <CTableDataCell>{drill === null || drill === "" ? "-" : drill}</CTableDataCell> 
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
                                    data: drillResultAverages,
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

export default DrillResultsSection;
