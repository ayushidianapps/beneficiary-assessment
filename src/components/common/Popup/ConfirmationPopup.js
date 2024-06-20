import React from 'react';
import './Popup.css';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
        <div className="popup-buttons">
          <button className="popup-button confirm" onClick={onConfirm}>Confirm</button>
          <button className="popup-button cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
