import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const WatchlistModal = ({ show, onClose }) => {
  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Watchlist</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* Add the content of your modal here */}
        <p>COMING SOON: This modal will allow you to add players and create your own watchlist. This can act as your draft board/the players you want to keep on your radar</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Close</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default WatchlistModal;
