import { useEffect } from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  buttonText,
  children,
  onClick,
}) {
  return (
    <div
      className={`popup popup_name_${name} ${isOpen ? `popup_opened` : ""}`}
      onClick={onClick}
    >
      <div className="popup__container popup__container_type_form">
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
        ></button>
        <h2 className="popup__title popup__title_type_form">{title}</h2>
        <form className="popup__form" name={name} id={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
