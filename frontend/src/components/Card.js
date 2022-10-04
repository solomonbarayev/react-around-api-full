import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = props => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const isLikedByCurrentUser = props.card.likes.some(
    user => user === currentUser._id
  );

  const cardLikeButtonClassName = `card__like-button ${isLikedByCurrentUser &&
    'card__like-button_active'}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeCard() {
    props.onLikeCard(props.card);
  }

  function handleDeleteCard() {
    props.onDeleteButtonClick(props.card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          type="button"
          aria-label="delete card"
          className="card__delete-button"
          onClick={handleDeleteCard}
        ></button>
      )}
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__title-area">
        <h2 className="card__title">{props.card.name}</h2>

        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="like card"
            onClick={handleLikeCard}
          ></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
