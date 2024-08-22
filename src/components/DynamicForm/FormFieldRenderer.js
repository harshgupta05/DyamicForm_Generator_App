import React from 'react';

const FormFieldRenderer = ({ field, value, error, touched, onChange, allValues }) => {
  const isVisible = () => {
    if (!field.conditionalLogic || !field.conditionalLogic.field) return true;
    return allValues[field.conditionalLogic.field] === field.conditionalLogic.value;
  };

  if (!isVisible()) return null;

  const handleChange = (e) => {
    if (field.type === 'file') {
      onChange(field.name, e.currentTarget.files[0]);
    } else if (field.type === 'checkbox') {
      onChange(field.name, e.target.checked);
    } else {
      onChange(field.name, e.target.value);
    }
  };

  return (
    <div className="form-field">
      <label htmlFor={field.name}>
        {field.label}
        {field.validation.required && ' *'}
      </label>
      {field.type === 'text' && (
        <input
          type="text"
          id={field.name}
          value={value}
          onChange={handleChange}
          placeholder={field.label}
        />
      )}
      {field.type === 'textarea' && (
        <textarea
          id={field.name}
          value={value}
          onChange={handleChange}
          placeholder={field.label}
        />
      )}
      {field.type === 'number' && (
        <input
          type="number"
          id={field.name}
          value={value}
          onChange={handleChange}
          placeholder={field.label}
        />
      )}
      {field.type === 'email' && (
        <input
          type="email"
          id={field.name}
          value={value}
          onChange={handleChange}
          placeholder={field.label}
        />
      )}
      {field.type === 'password' && (
        <input
          type="password"
          id={field.name}
          value={value}
          onChange={handleChange}
          placeholder={field.label}
        />
      )}
      {field.type === 'select' && (
        <select id={field.name} value={value} onChange={handleChange}>
          <option value="">Select {field.label}</option>
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {field.type === 'radio' && (
        <div className="radio-group">
          {field.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={value === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {field.type === 'checkbox' && (
        <input
          type="checkbox"
          id={field.name}
          checked={value}
          onChange={handleChange}
        />
      )}
      {field.type === 'file' && (
        <input type="file" id={field.name} onChange={handleChange} />
      )}
      {error && touched && <p className="error-text">{error}</p>}
    </div>
  );
};

export default FormFieldRenderer;
