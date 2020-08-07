import React from 'react';

function PopupWithImage() {
  return (
    <template id="image-popup-template">
      <figure className="popup__image-container popup__container_type_image">
        <button
          className="button button_action_close"
          type="reset"
          aria-label="close-image-popup"
        ></button>
        <img src="#" alt="" className="popup__image" />
        <figcaption className="popup__image-caption"></figcaption>
      </figure>
    </template>
  );
}

export default PopupWithImage;
