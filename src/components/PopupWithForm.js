import React from "react";

function PopupWithForm(props) {
  return (
    <>
      <div
        className={
          "popup__overlay" + (props.isOpen ? ' popup__overlay_visible' : '')
        }
      ></div>
      <div
        className={
          `popup__container popup__container_type_${props.name}` +
          (props.isOpen ? " popup__container_visible" : "")
        }
      >
        <button
          className="button button_action_close"
          type="reset"
          aria-label={`close-${props.name}-modal`}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          id={`${props.name}-form`}
          name={`${props.name}Form`}
          className="popup__form"
          action="#"
          noValidate
        >
          {props.children}
        </form>
      </div>
    </>
  );
}

export default PopupWithForm;
