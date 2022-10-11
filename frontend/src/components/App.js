import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  //states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [infoTooltipType, setInfoTooltipType] = useState("");

  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: ""
  });

  const [cards, setCards] = useState([]);

  //state for checking token
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  //currentUser state for context
  const [currentUser, setCurrentUser] = useState({
    name: "Loading...",
    about: "Loading..."
  });

  //state for loading
  const [isLoading, setIsLoading] = useState(false);

  //state for loggedIn
  const [loggedIn, setLoggedIn] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("jwt"));

  //state for user data
  const [userData, setUserData] = useState({
    email: ""
  });

  //history hook
  const history = useHistory();

  //adding event listener for ESC key and overlay click
  useEffect(() => {
    const closeByEscape = e => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    const closeByOverlay = e => {
      if (e.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    document.addEventListener("click", closeByOverlay);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
      document.removeEventListener("click", closeByOverlay);
    };
  }, []);

  useEffect(() => {
    if (token) {
      api
        .getUserInfo(token)
        .then(user => {
          setCurrentUser(user);
        })
        .catch(console.log);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      api
        .getInitialCards(token)
        .then(res => {
          setCards(res);
        })
        .catch(console.log);
    }
  }, [token]);

  //check token
  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then(res => {
          if (res._id) {
            setLoggedIn(true);
            setUserData({ email: res.email });
            history.push("/");
          }
        })
        .catch(err => {
          console.log(err);
          history.push("/signin");
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  //Event Handlers
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteButtonClick = card => {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const handleCardClick = card => {
    setIsImagePreviewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link
    });
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePreviewOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about }, token)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = url => {
    setIsLoading(true);
    api
      .setUserAvatar(url, token)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then(newCard => {
        setCards(cards =>
          cards.map(currentCard => {
            return currentCard._id === card._id ? newCard : currentCard;
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(selectedCard._id);
    api
      .deleteCard(selectedCard._id, token)
      .then(res => {
        const newCards = cards.filter(
          currentCard => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    console.log(card);
    api
      .createCard(card, token)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Register and Login
  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then(res => {
        if (res.data._id) {
          setInfoTooltipType("successful");
          history.push("/signin");
        } else {
          setInfoTooltipType("unsuccessful");
        }
      })
      .catch(err => {
        console.log(err);
        setInfoTooltipType("unsuccessful");
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);
          setUserData({ email });
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
        setInfoTooltipType("unsuccessful");
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({
      name: "Loading...",
      about: "Loading..."
    });
    history.push("/signin");
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          email={userData.email}
          handleSignout={handleSignout}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            isCheckingToken={isCheckingToken}
          >
            <Main
              onDeleteButtonClick={handleDeleteButtonClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
            />
          </ProtectedRoute>

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeletePopup
          isLoading={isLoading}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePreviewOpen}
          onClose={closeAllPopups}
          name="image-prev"
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          type={infoTooltipType}
          isTooltipOpen={isInfoTooltipOpen}
          name="tooltip"
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
