import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //Whenever User info changes in the context, it will also change here
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Pass the values of the managed components to the external handler
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit profile"
      name="edit-profile"
      buttonText={`${isLoading ? 'Saving...' : 'Save'}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            id="name-input"
            type="text"
            name="name"
            placeholder="Name"
            className="form__input form__input_type_profile-name"
            minLength="2"
            maxLength="40"
            value={name || ''}
            onChange={handleNameChange}
            required
          />
          <span className="form__input-error name-input-error"></span>
        </div>
        <div className="form__input-container">
          <input
            id="title-input"
            type="text"
            name="title"
            placeholder="About me"
            className="form__input form__input_type_profile-title"
            minLength="2"
            maxLength="200"
            value={description || ''}
            onChange={handleDescriptionChange}
            required
          />
          <span className="form__input-error title-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
