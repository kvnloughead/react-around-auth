import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
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
  const history = useHistory();
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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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

  function handleToolTip() {
    setIsInfoToolTipOpen(true);
  }

  // function tokenCheck() {
  //   // if the user has a token in localStorage,
  //   // this function will check that the user has a valid token
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     // we'll verify the token
  //     auth.getContent(jwt).then((res) => {
  //       if (res) {
  //         // log user in and get users data
  //         // const userData = {
  //         //   email: res.email
  //         // }
  //         // update state
  //         setLoggedIn(true);
  //         setEmail(res.email);
  //         history.push('/');
  //       }
  //     });
  //   }
  // }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.updateLikes(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
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
    api.setUserInfo({ name, about }).then((data) => {
      setCurrentUser(data);
    });
    closeAllPopups();
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar(avatar.current.value).then((data) => {
      setCurrentUser(data);
    });
    closeAllPopups();
  }

  function handleAddNewCard({ title, link }) {
    api.addNewCard({ title, link }).then((newCard) => {
      setCards([...cards, newCard]);
    });
    closeAllPopups();
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getCardList()
      .then((data) => {
        setCards((cards) => [...cards, ...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Router>
          <Header email={email} loggedIn={loggedIn} />
          <Switch>
            <Route path='/signin'>
              <Login handleLogin={handleLogin}/>
            </Route>
            <Route path='/signup'>
              <Register setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} handleToolTip={handleToolTip} />
              <InfoToolTip
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                loggedIn={loggedIn}
              />
            </Route>
            <Route path='/'>
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
                path='/'
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
          </Switch>
        </Router>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
