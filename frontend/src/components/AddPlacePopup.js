import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Новое место"
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      onClick={props.onClick}
    >
      <input
        className="popup__input"
        onChange={handleCardNameChange}
        id="cardName"
        type="text"
        name="name"
        value={cardName}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error" id="cardName-error"></span>
      <input
        className="popup__input"
        onChange={handleCardLinkChange}
        id="cardLink"
        type="text"
        name="link"
        value={cardLink}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error" id="cardLink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
