import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

const FieldList = () => {
  const { fields, removeField, setSelectedField } = useContext(FormContext);

  if (fields.length === 0) {
    return <p>No fields added yet.</p>;
  }

  return (
    <div className="field-list">
      {fields.map((field) => (
        <div key={field.id} className="field-item">
          <div>
            <strong>{field.label}</strong> ({field.type})
          </div>
          <div className="field-item-actions">
            <button onClick={() => setSelectedField(field)}>Edit</button>
            <button onClick={() => removeField(field.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FieldList;
