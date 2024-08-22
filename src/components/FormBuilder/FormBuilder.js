import React, { useContext, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import FieldList from './FieldList';
import AddEditFieldModal from '../Modals/AddEditFieldModal';
import LoadConfigModal from '../Modals/LoadConfigModal';

const FormBuilder = () => {
  const { fields, clearFields } = useContext(FormContext);
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [isLoadModalOpen, setLoadModalOpen] = useState(false);

  const handleSaveConfig = () => {
    const dataStr = JSON.stringify(fields, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formConfig.json';
    link.click();
  };

  return (
    <section className="form-builder">
      <div className="form-builder-header">
        <h2>Form Builder</h2>
        <div className="form-builder-actions">
          <button onClick={() => setAddEditModalOpen(true)}>Add Field</button>
          <button onClick={handleSaveConfig} disabled={fields.length === 0}>
            Save Config
          </button>
          <button onClick={() => setLoadModalOpen(true)}>Load Config</button>
          <button onClick={clearFields} disabled={fields.length === 0}>
            Clear Fields
          </button>
        </div>
      </div>
      <FieldList />
      {isAddEditModalOpen && (
        <AddEditFieldModal onClose={() => setAddEditModalOpen(false)} />
      )}
      {isLoadModalOpen && (
        <LoadConfigModal onClose={() => setLoadModalOpen(false)} />
      )}
    </section>
  );
};

export default FormBuilder;
