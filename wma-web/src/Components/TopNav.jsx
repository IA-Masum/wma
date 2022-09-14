import {
  faAnchor,
  faBars,
  faCircleDollarToSlot,
  faCode,
  faDollar,
  faDollarSign,
  faDoorOpen,
  faFileInvoiceDollar,
  faFunnelDollar,
  faHandHoldingDollar,
  faHomeAlt,
  faSearchDollar,
  faSignOut,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import "./../assets/CSS/topNav.css";
import FullPageLoader from "./FullPageLoader";
function TopNav() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { user, loading, logout } = useContext(AuthContext);
  return (
    <>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <div className="top-nav">
            <div className="avater">
              {user && user.name.charAt(0).toUpperCase()}
            </div>
            <div className="title">{user && user.name}</div>
            <div onClick={() => setShowDrawer(true)} className="menu-bar">
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          {showDrawer && (
            <div className="drawer">
              <div
                onClick={() => {
                  setShowDrawer(false);
                }}
                className="drawer-overlay"
              ></div>
              <div className="drawer-content">
                <div className="drawer-inner">
                  <div className="profile-info">
                    <div className="profile-avater">
                      {user && user.name.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="profile-name">{user && user.name}</h3>
                    <div>{user.email}</div>
                  </div>
                  <ul className="menu-list">
                    <li className="menu-list-item">
                      <NavLink to="/" className="menu-link">
                        <FontAwesomeIcon
                          icon={faHomeAlt}
                          style={{ marginRight: 10 }}
                        />
                        Home
                      </NavLink>
                    </li>

                    <li className="menu-list-item">
                      <NavLink to="/profile" className="menu-link">
                        <FontAwesomeIcon
                          icon={faUserAlt}
                          style={{ marginRight: 10 }}
                        />
                        Profile
                      </NavLink>
                    </li>

                    <li className="menu-list-item">
                      <a href="/income-sectors" className="menu-link">
                        <FontAwesomeIcon
                          icon={faDoorOpen}
                          style={{ marginRight: 10 }}
                        />
                        Income Sectors
                      </a>
                    </li>

                    <li className="menu-list-item">
                      <a href="#" className="menu-link">
                        <FontAwesomeIcon
                          icon={faAnchor}
                          style={{ marginRight: 10 }}
                        />
                        Incomes
                      </a>
                    </li>

                    <li className="menu-list-item">
                      <a href="#" className="menu-link">
                        <FontAwesomeIcon
                          icon={faFileInvoiceDollar}
                          style={{ marginRight: 10 }}
                        />
                        Expence Sectors
                      </a>
                    </li>
                    <li className="menu-list-item">
                      <a href="#" className="menu-link">
                        <FontAwesomeIcon
                          icon={faDollar}
                          style={{ marginRight: 10 }}
                        />
                        Expences
                      </a>
                    </li>

                    <li className="menu-list-item">
                      <a href="#" className="menu-link">
                        <FontAwesomeIcon
                          icon={faSearchDollar}
                          style={{ marginRight: 10 }}
                        />
                        Loan Sectors
                      </a>
                    </li>

                    <li className="menu-list-item">
                      <a href="#" className="menu-link">
                        <FontAwesomeIcon
                          icon={faHandHoldingDollar}
                          style={{ marginRight: 10 }}
                        />
                        Loans
                      </a>
                    </li>
                    <li className="menu-list-item">
                      <a href="#" className="menu-link">
                        <FontAwesomeIcon
                          icon={faFunnelDollar}
                          style={{ marginRight: 10 }}
                        />
                        Lends
                      </a>
                    </li>
                    <li className="menu-list-item">
                      <a href="#" className="menu-link">
                        <FontAwesomeIcon
                          icon={faCircleDollarToSlot}
                          style={{ marginRight: 10 }}
                        />
                        Savings
                      </a>
                    </li>
                    <li className="menu-list-item">
                      <a href="#" className="menu-link">
                        <FontAwesomeIcon
                          icon={faCode}
                          style={{ marginRight: 10 }}
                        />
                        About Developer
                      </a>
                    </li>

                    <li className="menu-list-item">
                      <button onClick={logout} className="menu-link">
                        <FontAwesomeIcon
                          icon={faSignOut}
                          style={{ marginRight: 10 }}
                        />
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default TopNav;
