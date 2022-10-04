import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({
  onCardClick,
  onAddPlaceClick,
  onEditProfileClick,
  onEditAvatarClick,
  cards,
  onCardLike,
  onDeleteButtonClick,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content section">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatarClick}>
          <img
            src={currentUser.avatar}
            alt="User's Profile"
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <div className="profile__person">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="edit profile"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__title">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="add place"
          onClick={onAddPlaceClick}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onLikeCard={onCardLike}
                onDeleteButtonClick={onDeleteButtonClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
