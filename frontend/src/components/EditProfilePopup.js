import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userDescription);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      onClick={props.onClick}
    >
      <input
        className="popup__input"
        onChange={handleNameChange}
        id="yourName"
        type="text"
        name="yourName"
        value={name}
        placeholder="Имя"
        minLength="2"
        maxLength="400"
        required
      />
      <span className="popup__input-error" id="yourName-error"></span>
      <input
        className="popup__input"
        onChange={handleDescriptionChange}
        id="job"
        type="text"
        name="yourJob"
        value={description}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
