function InfoTooltipSignIn(props) {
  return (
    <div
      className={`popup popup_name_sign-up ${
        props.isOpen ? `popup_opened` : ""
      }`}
      onClick={props.onClick}
    >
      <div className="popup__container popup__container_type_sign-up">
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        ></button>
        <div
          className={`popup__sign-up-logo ${
            props.isSignIn
              ? "popup__sign-up-logo_type_success"
              : "popup__sign-up-logo_type_failure"
          }`}
        />
        <h2 className="popup__title popup__title_type_sign-up">
          {props.isSignIn
            ? "Авторизация прошла успешно !"
            : "Неправильные почта или пароль."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltipSignIn;