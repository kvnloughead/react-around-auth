import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from 'react-router-dom';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import auth from '../utils/Auth';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(false);
  const [tooltipMode, setTooltipMode] = React.useState(false);

  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleToolTip(mode) {
    setTooltipMode(mode);
    setIsInfoToolTipOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .updateLikes(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar.current.value)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  function handleAddNewCard({ title, link }) {
    api
      .addNewCard({ title, link })
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  // function handleLoginSubmit(e) {
  //   e.preventDefault();
  //   auth
  //     .authorize(email, password)
  //     .then((data) => {
  //       if (!email || !password) {
  //         throw new Error('400 - one or more of the fields were not provided');
  //       }
  //       if (!data) {
  //         throw new Error('401 - the user with the specified email not found');
  //       }
  //       if (data.token) {
  //         handleLogin();
  //       } 
  //     })
  //     .then(() => {
  //       resetForm();
  //     })
  //     .then(() => {
  //       history.push('/around');
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  const onSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/signin');
  };

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        api
          .getCardList()
          .then((data) => {
            if (data) {
              setCards((cards) => [...cards, ...data]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router>
        <Header
          userEmail={userEmail}
          loggedIn={loggedIn}
          handleSignOut={onSignOut}
        />
        <Switch>
          <Route exact path='/signin'>
            <Login
              loggedIn={loggedIn}
              userEmail={setUserEmail}
              setUserEmail={setUserEmail}
              handleLogin={handleLogin}
              handleToolTip={handleToolTip}
            />
            <InfoToolTip
              isOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}
              loggedIn={loggedIn}
              mode={tooltipMode}
            />
          </Route>
          <Route exact path='/signup'>
            <Register
              setUserEmail={setUserEmail}
              handleLogin={handleLogin}
              handleToolTip={handleToolTip}
            />
            <InfoToolTip
              isOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}
              loggedIn={loggedIn}
              mode={tooltipMode}
            />
          </Route>
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/around' /> : <Redirect to='/signin' />}
          </Route>
          <Route path='/around'>
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddNewCard={handleAddNewCard}
            />
            <ProtectedRoute
              path='/around'
              loggedIn={loggedIn}
              component={Main}
              onCloseButtons={closeAllPopups}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isAddPlacePopupOpen={isAddPlacePopupOpen}
              isEditAvatarPopupOpen={isEditAvatarPopupOpen}
              cards={cards}
              selectedCard={selectedCard}
            />
            <Footer />
          </Route>
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
