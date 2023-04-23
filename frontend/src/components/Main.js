import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.userAvatar}
            alt={currentUser.userName}
          />
          <button
            className="profile__update-button"
            onClick={props.onEditAvatar}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.userName}</h1>
          <button
            className="profile__edit-button"
            onClick={props.onEditProfile}
            type="button"
          ></button>
          <p className="profile__subtitle">{currentUser.userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="cards">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            handleImagePopup={props.handleImagePopup}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
