function ImagePopup(props) {
  return (
    <div
      className={`popup popup_name_picture ${
        props.isOpen ? `popup_opened` : ""
      }`}
      onClick={props.onClick}
    >
      <div className="popup__container popup__container_type_picture">
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        ></button>
        <img
          className="popup__image"
          src={props.card?.link}
          alt={props.card?.name}
        />
        <h2 className="popup__title popup__title_type_picture">
          {props.card?.name}
        </h2>
      </div>
    </div>
  );
}

export default ImagePopup;
