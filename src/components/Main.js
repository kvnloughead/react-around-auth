import React from "react";
import api from "../utils/Api";
import Card from "./Card";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.updateLikes(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    const isOwned = card.owner._id === currentUser._id;
    console.log(isOwned);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards((cards) => [...cards, ...data]);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div>
          <img
            src={currentUser && currentUser.avatar}
            alt="Avatar"
            className="profile__image"
          />
          <button
            className="button button_action_change-avatar"
            aria-label="open-change-avatar-modal"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h2 className="profile__name">{currentUser && currentUser.name}</h2>
            <p className="profile__job">{currentUser && currentUser.about}</p>
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
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
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
      
      <EditProfilePopup isOpen={props.isEditProfilePopupOpen} onClose={props.onCloseButtons} />
      {/* <PopupWithForm
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
      </PopupWithForm> */}

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

      <PopupWithImage
        onClose={props.onCloseButtons}
        card={props.selectedCard}
      />
    </main>
  );
}

export default Main;
