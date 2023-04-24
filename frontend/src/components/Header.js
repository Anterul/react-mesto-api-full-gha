import { Route, Routes, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <p className="header__link">{props.email}</p>
                <button
                  className="header__button"
                  type="button"
                  onClick={props.onSignOut}
                >
                  Выйти
                </button>
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Link className="header__link" to="/signup">
                  Регистрация
                </Link>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Link className="header__link" to="/signin">
                  Войти
                </Link>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
