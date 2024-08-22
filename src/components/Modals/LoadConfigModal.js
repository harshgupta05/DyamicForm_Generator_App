import React, { useContext, useState } from 'react';
import { FormContext } from '../../context/FormContext';

const LoadConfigModal = ({ onClose }) => {
  const { addField, clearFields } = useContext(FormContext);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (Array.isArray(json)) {
            clearFields();
            json.forEach((field) => addField(field));
            onClose();
          } else {
            setError('Invalid JSON format');
          }
        } catch (err) {
          setError('Error parsing JSON');
        }
      };
      reader.readAsText(file);
    } else {
      setError('Please upload a valid JSON file');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Load Form Configuration</h2>
        <div className="form-group">
          <input type="file" accept=".json" onChange={handleFileUpload} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadConfigModal;
