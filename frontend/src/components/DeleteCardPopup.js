import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  return (
    <PopupWithForm
      name="delete-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Вы уверены ?"
      onSubmit={props.onSubmit}
      buttonText="Да"
      onClick={props.onClick}
    />
  );
}

export default DeleteCardPopup;
