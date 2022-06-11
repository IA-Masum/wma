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
import { useState } from "react";
import "./../assets/CSS/topNav.css";
function TopNav() {
  const [showDrawer, setShowDrawer] = useState(true);
  return (
    <>
      <div className="top-nav">
        <div className="avater">I</div>
        <div className="title">IA Masum</div>
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
                <div className="profile-avater">I</div>
                <h3 className="profile-name">IA Masum</h3>
                <div>iamasum133@gmail.com</div>
              </div>
              <ul className="menu-list">
                <li className="menu-list-item">
                  <a href="#" className="menu-link active">
                    <FontAwesomeIcon
                      icon={faHomeAlt}
                      style={{ marginRight: 10 }}
                    />
                    Home
                  </a>
                </li>

                <li className="menu-list-item">
                  <a href="#" className="menu-link">
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      style={{ marginRight: 10 }}
                    />
                    Profile
                  </a>
                </li>

                <li className="menu-list-item">
                  <a href="#" className="menu-link">
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
                  <a href="#" className="menu-link">
                    <FontAwesomeIcon
                      icon={faSignOut}
                      style={{ marginRight: 10 }}
                    />
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopNav;
