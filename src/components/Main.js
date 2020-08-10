import React from "react";
import api from "../utils/Api";
import Card from "./Card";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .loadUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userName, userDescription, userAvatar]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(cards.concat(data));
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div>
          <img src={userAvatar} alt="Avatar" className="profile__image" />
          <button
            className="button button_action_change-avatar"
            aria-label="open-change-avatar-modal"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h2 className="profile__name">{userName}</h2>
            <p className="profile__job">{userDescription}</p>
          </div>
          <button
            className="button button_action_edit"
            aria-label="open-edit-profile-modal"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="button button_action_add"
          aria-label="open-new-card-modal"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <div className="places">
        <ul className="places__grid">
          {cards.map((card) => (
            <Card card={card} />
          ))}
        </ul>
      </div>

      <PopupWithForm
        name="delete"
        title="Are you sure?"
        isOpen={false}
        onClose={props.onCloseButtons}
      >
        <button
          className="button button_action_submit"
          type="submit"
          value="Save"
          aria-label="confirm-delete-card"
        >
          Yes
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Change profile picture"
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onCloseButtons}
      >
        <input
          className="popup__input"
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Enter link to image"
          minLength="2"
          required
        />
        <span className="popup__input-error" id="avatar-input-error"></span>

        <button
          className="button button_action_submit button_inactive"
          type="submit"
          value="Save"
          aria-label="submit-change-avatar"
        >
          Save
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="edit"
        title="Edit profile"
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onCloseButtons}
      >
        <input
          className="popup__input"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error" id="name-input-error"></span>
        <input
          className="popup__input"
          type="text"
          id="job"
          name="job"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error" id="job-input-error"></span>
        <button
          className="button button_action_submit button_inactive"
          type="submit"
          value="Save"
          aria-label="submit-edit-profile"
        >
          Save
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="add"
        title="New place"
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.onCloseButtons}
      >
        <input
          className="popup__input"
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          required
        />
        <span className="popup__input-error" id="title-input-error"></span>
        <input
          className="popup__input"
          type="url"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image link"
          required
        />
        <span className="popup__input-error" id="imageUrl-input-error"></span>
        <button
          className="button button_action_submit button_inactive"
          type="submit"
          value="Create"
          aria-label="submit-new-card-modal"
        >
          Create
        </button>
      </PopupWithForm>

      <div className="popup__overlay">
        <PopupWithImage onClose={props.onCloseButtons} />
      </div>
    </main>
  );
}

export default Main;
