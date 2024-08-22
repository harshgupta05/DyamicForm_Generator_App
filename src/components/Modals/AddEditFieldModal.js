import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../context/FormContext';
// import { v4 as uuidv4 } from 'uuid';

const fieldTypes = [
  { value: 'text', label: 'Text Input' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'number', label: 'Number Input' },
  { value: 'email', label: 'Email' },
  { value: 'password', label: 'Password' },
  { value: 'select', label: 'Dropdown' },
  { value: 'radio', label: 'Radio Button' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'file', label: 'File Upload' },
];

const AddEditFieldModal = ({ onClose }) => {
  const { addField, updateField, selectedField, setSelectedField } = useContext(FormContext);
  const [fieldData, setFieldData] = useState({
    label: '',
    name: '',
    type: 'text',
    options: [],
    validation: {
      required: false,
      minLength: '',
      maxLength: '',
      pattern: '',
      fileType: '',
      fileSize: '',
    },
    conditionalLogic: null,
  });
  const [optionInput, setOptionInput] = useState('');

  useEffect(() => {
    if (selectedField) {
      setFieldData(selectedField);
    }
  }, [selectedField]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('validation.')) {
      const key = name.split('.')[1];
      setFieldData((prev) => ({
        ...prev,
        validation: {
          ...prev.validation,
          [key]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFieldData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOption = () => {
    if (optionInput.trim()) {
      setFieldData((prev) => ({
        ...prev,
        options: [...prev.options, optionInput.trim()],
      }));
      setOptionInput('');
    }
  };

  const handleRemoveOption = (index) => {
    setFieldData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedField) {
      updateField(fieldData);
    } else {
      addField(fieldData);
    }
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setSelectedField(null);
    setFieldData({
      label: '',
      name: '',
      type: 'text',
      options: [],
      validation: {
        required: false,
        minLength: '',
        maxLength: '',
        pattern: '',
        fileType: '',
        fileSize: '',
      },
      conditionalLogic: null,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{selectedField ? 'Edit Field' : 'Add New Field'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              name="label"
              value={fieldData.label}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={fieldData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={fieldData.type}
              onChange={handleInputChange}
              required
            >
              {fieldTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {(fieldData.type === 'select' ||
            fieldData.type === 'radio' ||
            fieldData.type === 'checkbox') && (
            <div className="form-group">
              <label>Options</label>
              <div className="options-input">
                <input
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                />
                <button type="button" onClick={handleAddOption}>
                  Add Option
                </button>
              </div>
              <ul className="options-list">
                {fieldData.options.map((option, index) => (
                  <li key={index}>
                    {option}
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Validation Rules */}
          <div className="form-group">
            <h3>Validation Rules</h3>
            <div className="validation-rule">
              <label>
                <input
                  type="checkbox"
                  name="validation.required"
                  checked={fieldData.validation.required}
                  onChange={handleInputChange}
                />
                Required
              </label>
            </div>

            {['text', 'textarea', 'email', 'password'].includes(
              fieldData.type
            ) && (
              <>
                <div className="validation-rule">
                  <label>Min Length</label>
                  <input
                    type="number"
                    name="validation.minLength"
                    value={fieldData.validation.minLength}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="validation-rule">
                  <label>Max Length</label>
                  <input
                    type="number"
                    name="validation.maxLength"
                    value={fieldData.validation.maxLength}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {fieldData.type === 'number' && (
              <>
                <div className="validation-rule">
                  <label>Min Value</label>
                  <input
                    type="number"
                    name="validation.min"
                    value={fieldData.validation.min}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="validation-rule">
                  <label>Max Value</label>
                  <input
                    type="number"
                    name="validation.max"
                    value={fieldData.validation.max}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {fieldData.type === 'file' && (
              <>
                <div className="validation-rule">
                  <label>Allowed File Types (comma-separated)</label>
                  <input
                    type="text"
                    name="validation.fileType"
                    value={fieldData.validation.fileType}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="validation-rule">
                  <label>Max File Size (in KB)</label>
                  <input
                    type="number"
                    name="validation.fileSize"
                    value={fieldData.validation.fileSize}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {fieldData.type === 'text' && (
              <div className="validation-rule">
                <label>Pattern (Regex)</label>
                <input
                  type="text"
                  name="validation.pattern"
                  value={fieldData.validation.pattern}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          {/* Conditional Logic */}
          <div className="form-group">
            <h3>Conditional Logic</h3>
            <p>Show this field only if the following condition is met:</p>
            <div className="conditional-logic">
              <label>Field Name</label>
              <input
                type="text"
                name="conditionalLogic.field"
                value={fieldData.conditionalLogic?.field || ''}
                onChange={(e) =>
                  setFieldData((prev) => ({
                    ...prev,
                    conditionalLogic: {
                      ...prev.conditionalLogic,
                      field: e.target.value,
                    },
                  }))
                }
              />
              <label>Field Value</label>
              <input
                type="text"
                name="conditionalLogic.value"
                value={fieldData.conditionalLogic?.value || ''}
                onChange={(e) =>
                  setFieldData((prev) => ({
                    ...prev,
                    conditionalLogic: {
                      ...prev.conditionalLogic,
                      value: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit">{selectedField ? 'Update' : 'Add'} Field</button>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditFieldModal;
