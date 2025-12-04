import { useState } from 'react';
import './DateSelector.css';

const DateSelector = ({ isOpen, onClose, onSelectDate, selectedDate, attractionName }) => {
  const [selectedDateValue, setSelectedDateValue] = useState(selectedDate || '');

  if (!isOpen) return null;

  // Get minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Get maximum date (1 year from now)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleDateChange = (e) => {
    setSelectedDateValue(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedDateValue) {
      onSelectDate(selectedDateValue);
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="date-selector-overlay" onClick={onClose}>
      <div className="date-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="date-selector-header">
          <h2 className="date-selector-title">Select Date</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {attractionName && (
          <p className="attraction-name-text">{attractionName}</p>
        )}

        <div className="date-selector-content">
          <label className="date-label">Choose a date:</label>
          <input
            type="date"
            className="date-input"
            value={selectedDateValue}
            onChange={handleDateChange}
            min={minDate}
            max={maxDateString}
          />
          
          {selectedDateValue && (
            <div className="selected-date-display">
              <p className="selected-date-text">
                Selected: <strong>{formatDate(selectedDateValue)}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="date-selector-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="confirm-button" 
            onClick={handleConfirm}
            disabled={!selectedDateValue}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;

