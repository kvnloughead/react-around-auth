import React from "react";

function Card(props) {
  return (
    <li key={props.card._id} className="place">
      <div
        className="place__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
      ></div>
      <button
        className="place__delete-btn place__delete-btn_hidden"
        aria-label="delete-card"
      ></button>
      <div className="place__footer">
        <h2 className="place__name">{props.card.name}</h2>
        <div className="place__like-container">
          <button
            className="place__like-btn"
            aria-label="like-or-unlike-card"
          ></button>
          <p className="place__like-counter"></p>
        </div>
      </div>
    </li>
  );
}

export default Card;

// export default class Card {
//   constructor(
//     id,
//     name,
//     link,
//     cardSelector,
//     likes,
//     ownerId,
//     userId,
//     clickHandler,
//     likeClickHandler,
//     deleteClickHandler
//   ) {
//     this._id = id;
//     this._name = name;
//     this._link = link;
//     this._cardSelector = cardSelector;
//     this._handleCardClick = clickHandler;
//     this._likes = likes;
//     this._numLikes = likes.length;
//     this._ownerId = ownerId;
//     this._currentUserId = userId;
//     this._isOwned = this._ownerId === this._currentUserId;
//     this._handleLikeClick = likeClickHandler;
//     this._deleteClickHandler = deleteClickHandler;
//   }

//   _isLikedByCurrentUser() {
//     for (let i = 0; i < this._likes.length; i++) {
//       if (this._likes[i]._id === this._currentUserId) {
//         return true;
//       }
//     }
//     return false;
//   }

//   _getTemplate() {
//     const cardElement = document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".place")
//       .cloneNode(true);
//     this._placeEl = cardElement;
//     this._imageEl = cardElement.querySelector(".place__image");
//     this._nameEl = cardElement.querySelector(".place__name");
//     this._likeBtnEl = cardElement.querySelector(".place__like-btn");
//     this._likeCounterElem = cardElement.querySelector(".place__like-counter");
//     this._deleteBtnEl = cardElement.querySelector(".place__delete-btn");
//     return cardElement;
//   }

//   _addContent() {
//     this._imageEl.style.backgroundImage = `url(${this._link})`;
//     this._nameEl.textContent = this._name;
//     this._likeCounterElem.textContent = this._likes.length;
//     if (this._isLikedByCurrentUser()) {
//       this._likeBtnEl.classList.add("place__like-btn_clicked");
//     }
//   }

//   _likeBtnHandler() {
//     this._likeBtnEl.classList.toggle("place__like-btn_clicked");
//     if (this._isLikedByCurrentUser()) {
//       this._numLikes -= 1;
//     } else {
//       this._numLikes += 1;
//     }
//     this._likeCounterElem.textContent = this._numLikes;
//     this._handleLikeClick(this, this._id, this._isLikedByCurrentUser());
//   }

//   _deleteBtnHandler() {
//     this._deleteClickHandler(this._id, this._placeEl);
//   }

//   _addEventListeners() {
//     this._imageEl.addEventListener("click", () => {
//       this._handleCardClick(this._name, this._link);
//     });
//     this._likeBtnEl.addEventListener("click", () => {
//       this._likeBtnHandler();
//     });
//     this._deleteBtnEl.addEventListener("click", () => {
//       this._deleteBtnHandler();
//     });
//   }

//   generateCard() {
//     const card = this._getTemplate();
//     if (this._isOwned) {
//       this._deleteBtnEl.classList.remove("place__delete-btn_hidden");
//     }
//     this._addContent();
//     this._addEventListeners();
//     return card;
//   }
// }
