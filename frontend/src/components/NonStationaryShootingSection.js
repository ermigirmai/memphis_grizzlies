import React from 'react';

const NonStationaryShootingSection = ({ nonStationaryShootingData }) => {
  return (
    <div className="section">
      <h5>NonStationaryShootingSection</h5>
      {/* Display the drill results data here */}
      <table>
        <thead>
          {/* Add table header */}
        </thead>
        <tbody>
          {/* Map through the drillResults and display data in rows */}
        </tbody>
      </table>
    </div>
  );
};

export default NonStationaryShootingSection;
