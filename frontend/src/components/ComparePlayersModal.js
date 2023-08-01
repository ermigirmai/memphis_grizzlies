import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const ComparePlayersModal = ({ show, onClose }) => {
  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Compare Playes</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* Add the content of your modal here */}
        <p>COMING SOON: This modal will allow you to select players and compare their combine statistics side by side</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Close</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ComparePlayersModal;
