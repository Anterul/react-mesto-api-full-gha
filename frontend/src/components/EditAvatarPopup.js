import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Обновить аватар"
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      onClick={props.onClick}
    >
      <input
        ref={inputRef}
        className="popup__input"
        id="cardAvatar"
        type="text"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__input-error" id="cardAvatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
