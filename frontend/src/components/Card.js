import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
    props.handleImagePopup();
  }

  function handleLikeCard() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        {isOwn && (
          <button
            className="card__delete-button"
            onClick={handleDeleteClick}
            type="button"
          ></button>
        )}
        <div className="card__like-area">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeCard}
            type="button"
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
