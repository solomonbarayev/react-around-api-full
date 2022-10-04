import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

const AddPlacePopup = ({ isLoading, isOpen, onClose, onAddPlaceSubmit }) => {
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    const { name, link } = values;
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  }

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  return (
    <PopupWithForm
      title="New place"
      name="add-place"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={`${isLoading ? 'Creating...' : 'Create'}`}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            id="place-title-input"
            type="text"
            name="name"
            placeholder="Title"
            className="form__input form__input_type_place-name"
            required
            minLength="1"
            maxLength="30"
            value={values.name || ''}
            onChange={handleChange}
          />
          <span className="form__input-error place-title-input-error"></span>
        </div>
        <div className="form__input-container">
          <input
            id="place-url-input"
            type="url"
            name="link"
            placeholder="Image link"
            className="form__input form__input_type_place-url"
            required
            value={values.link || ''}
            onChange={handleChange}
          />
          <span className="form__input-error place-url-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
