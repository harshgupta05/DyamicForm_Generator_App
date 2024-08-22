import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  const addField = (field) => {
    setFields([...fields, { ...field, id: uuidv4() }]);
  };

  const updateField = (updatedField) => {
    setFields(fields.map(field => field.id === updatedField.id ? updatedField : field));
  };

  const removeField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const clearFields = () => {
    setFields([]);
  };

  const value = {
    fields,
    addField,
    updateField,
    removeField,
    clearFields,
    selectedField,
    setSelectedField,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};
