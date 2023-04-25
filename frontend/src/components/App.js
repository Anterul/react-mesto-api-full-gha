import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { AppContext } from "../contexts/AppContext";
import * as Auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import InfoTooltipSignIn from "./InfoTooltipSignIn";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    _id: "",
  });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isInfoTooltipSignInOpen, setIsInfoTooltipSignInOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImagePopup() {
    setIsImagePopupOpen(true);
  }

  function handleLogin() {
    setIsLogedIn(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsInfoTooltipSignInOpen(false);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }
  
  function handleInfoTooltipSignIn() {
    setIsInfoTooltipSignInOpen(true);
  }

  function handleSignUpStatus() {
    setIsSignUp(true);
  }

  function handleSignInStatus() {
    setIsSignIn(true);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isInfoTooltipOpen ||
    isInfoTooltipSignInOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleOverlay(e) {
    if (e.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          _id: userData._id,
        });
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .submitProfileData(name, about)
      .then((data) => {
        setCurrentUser({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar,
          _id: data._id,
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .updateAvatar(avatar)
      .then((data) => {
        setCurrentUser({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar,
          _id: data._id,
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const navigate = useNavigate();

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            setIsLogedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
  }

  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/signup") {
      navigate("/signin", { replace: true });
    }
  }, [location.pathname]);

  useEffect(() => {
    tokenCheck();
  }, [isLoggedIn]);

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
    setIsLogedIn(false);
  }

  function handleRegister(password, email) {
    Auth.register(password, email)
      .then((res) => {
        handleSignUpStatus();
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        setIsSignUp(false);
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  function handleSignIn(password, email) {
    Auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          handleSignInStatus();
          handleLogin();
          localStorage.setItem("jwt", data.token);
          setEmail(data.email);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        setIsSignIn(false);
      })
      .finally(() => {
        handleInfoTooltipSignIn();
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{ state: isLoggedIn, handleLogin: handleLogin }}
      >
        <div className="page">
          <div className="page-content">
            <Header email={email} onSignOut={signOut} />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    exact
                    element={Main}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={setSelectedCard}
                    handleImagePopup={handleImagePopup}
                    onCardLike={handleCardLike}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                  />
                }
              />
              <Route
                path="/signup"
                element={<Register onSignUp={handleRegister} />}
              />
              <Route
                path="/signin"
                element={<Login onSignIn={handleSignIn} />}
              />
            </Routes>
            {isLoggedIn && <Footer />}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              buttonText={isLoading ? "Сохранение..." : "Сохранить"}
              onClick={handleOverlay}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              buttonText={isLoading ? "Сохранение..." : "Создать"}
              onClick={handleOverlay}
            />
            <DeleteCardPopup
              isOpen={isDeleteCardPopupOpen}
              onClose={closeAllPopups}
              onSubmit={handleCardDelete}
              onClick={handleOverlay}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              buttonText={isLoading ? "Сохранение..." : "Сохранить"}
              onClick={handleOverlay}
            />
            <ImagePopup
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
              onClick={handleOverlay}
            />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              isSignUp={isSignUp}
              onClose={closeAllPopups}
              onClick={handleOverlay}
            />
            <InfoTooltipSignIn
              isOpen={isInfoTooltipSignInOpen}
              isSignIn={isSignIn}
              onClose={closeAllPopups}
              onClick={handleOverlay}
            />
          </div>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
