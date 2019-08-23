import React from "react"
import { Link } from "gatsby"
import styles from "./header.module.css"
import AuthContext from '../../context/auth-context';

const Header = () => (
  <AuthContext.Consumer>
    {context => (
      <header className={styles.header}>
        <div className={styles[`header__wrap`]}>
          <h1 className={styles[`header__heading`]}>
            <Link
              to="/"
              className={`${styles[`header__link`]} ${
                styles[`header__link--home`]
              }`}
            >
              {`Gatsby Events[1]`}
            </Link>
          </h1>
          <nav role="main" className={styles[`header__nav`]}>
            <Link to="/app/events" className={styles[`header__link`]}>
              Events
            </Link>
            {context.token && <Link to="/app/bookings" className={styles[`header__link`]}>
              Bookings
            </Link>}
          </nav>
        </div>
      </header>
    )}
  </AuthContext.Consumer>
)

export default Header;
