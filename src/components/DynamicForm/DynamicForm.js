import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFieldRenderer from './FormFieldRenderer';

const DynamicForm = () => {
  const { fields } = useContext(FormContext);

  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const validationSchema = fields.reduce((schema, field) => {
    let validator = Yup.string();

    if (field.validation.required) {
      validator = validator.required(`${field.label} is required`);
    }

    if (field.validation.minLength) {
      validator = validator.min(
        field.validation.minLength,
        `${field.label} must be at least ${field.validation.minLength} characters`
      );
    }

    if (field.validation.maxLength) {
      validator = validator.max(
        field.validation.maxLength,
        `${field.label} must be at most ${field.validation.maxLength} characters`
      );
    }

    if (field.type === 'email') {
      validator = validator.email('Invalid email format');
    }

    if (field.validation.pattern) {
      validator = validator.matches(
        new RegExp(field.validation.pattern),
        `${field.label} format is invalid`
      );
    }

    if (field.type === 'number') {
      validator = Yup.number();
      if (field.validation.min) {
        validator = validator.min(
          field.validation.min,
          `${field.label} must be greater than or equal to ${field.validation.min}`
        );
      }
      if (field.validation.max) {
        validator = validator.max(
          field.validation.max,
          `${field.label} must be less than or equal to ${field.validation.max}`
        );
      }
    }

    if (field.type === 'file') {
      validator = Yup.mixed();
      if (field.validation.required) {
        validator = validator.required(`${field.label} is required`);
      }
      validator = validator.test(
        'fileSize',
        `File size is too large`,
        (value) => {
          if (!value) return true;
          return value.size / 1024 <= field.validation.fileSize;
        }
      );
      validator = validator.test(
        'fileType',
        `Unsupported file format`,
        (value) => {
          if (!value) return true;
          const fileTypes = field.validation.fileType.split(',').map((type) => type.trim());
          return fileTypes.includes(value.type);
        }
      );
    }

    schema[field.name] = validator;
    return schema;
  }, {});

  const handleSubmit = (values) => {
    console.log('Form Submitted', values);
    alert('Form submitted successfully!');
  };

  if (fields.length === 0) {
    return null;
  }

  return (
    <section className="dynamic-form">
      <h2>Preview & Submit Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            {fields.map((field) => (
              <FormFieldRenderer
                key={field.id}
                field={field}
                value={values[field.name]}
                error={errors[field.name]}
                touched={touched[field.name]}
                onChange={setFieldValue}
                allValues={values}
              />
            ))}
            <div className="form-actions">
              <button type="submit">Submit Form</button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default DynamicForm;
