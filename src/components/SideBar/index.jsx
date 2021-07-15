import React from "react";
import PropTypes from "prop-types";
import styles from "./SideBar.module.css";
import { Link, NavLink, matchPath } from "react-router-dom";
import BackButton from "../../assets/images/backButton.svg";
import { ReactComponent as Settings } from "../../assets/images/settings.svg";

const SideBar = (props) => {
  const {
    name,
    params,
    pageRoute,
    cpuLink,
    memoryLink,
    databaseLink,
    networkLink,
    allMetricsLink,
    appLogsLink,
  } = props;

  const isAppPage = matchPath(pageRoute, {
    path: "/users/:userID/projects/:projectID/apps/:appID/metrics",
    exact: true,
    strict: true,
  });

  const isAppMetricsPage = matchPath(pageRoute, {
    path: "/users/:userID/projects/:projectID/apps/:appID/",
    exact: false,
    strict: true,
  });

  const pageLocation = matchPath(pageRoute, {
    path: "/users/:userID/projects/:projectID/apps",
    exact: true,
    strict: true,
  });

  const databaseLocation = matchPath(pageRoute, {
    path: "/users/:userID/projects/:projectID/databases/:databaseID/settings",
    exact: true,
    strict: true,
  });

  const { userID, projectID, appID } = params;

  return (
    
    <div className={styles.SideBar}>
      <div>
        { databaseLocation ? (
          <div className={styles.SideBarTopSection}>
            <Link
              to={{ pathname: `/users/${userID}/projects/${projectID}/databases` }}
            >
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link
              to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }}
              className={styles.ProjectName}
            >
              {name}
            </Link>
          </div>
          ) : isAppPage ? (
            <div className={styles.SideBarTopSection}>
              <Link
                to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }}
              >
                <img src={BackButton} alt="Back Button" />
                <span>&nbsp; &nbsp; &nbsp;</span>
              </Link>
              <Link
                to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }}
                className={styles.ProjectName}
              >
                {name}
              </Link>
            </div>
          ) : isAppMetricsPage ? (
            <div className={styles.SideBarTopSection}>
              <Link
                to={{ pathname: `/users/${userID}/projects/${projectID}/apps/${appID}/metrics` }}
              >
                <img src={BackButton} alt="Back Button" />
                <span>&nbsp; &nbsp; &nbsp;</span>
              </Link>
              <Link
                to={{ pathname: `/users/${userID}/projects/${projectID}/apps/${appID}/metrics` }}
                className={styles.ProjectName}
              >
                {name}
              </Link>
            </div>
          ) : pageLocation ? (
            <div className={styles.SideBarTopSection}>
              <Link to={{ pathname: `/users/${userID}/projects/` }}>
                <img src={BackButton} alt="Back Button" />
                <span>&nbsp; &nbsp; &nbsp;</span>
              </Link>
              <Link
                to={{ pathname: `/users/${userID}/projects/` }}
                className={styles.ProjectName}
              >
                {name}
              </Link>
            </div>
          ) : (
            <div className={styles.SideBarTopSection}>
              <Link
                to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }}
              >
                <img src={BackButton} alt="Back Button" />
                <span>&nbsp; &nbsp; &nbsp;</span>
              </Link>
              <Link
                to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }}
                className={styles.ProjectName}
              >
                {name}
              </Link>
            </div>
        )}
      </div>

      <div className={styles.SideBarBottomSection}>
        <div className={styles.SideBarLinks}>
          <NavLink
            to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }}
            className={styles.SubBarListItem}
          >
            Dashboard
          </NavLink>
          <Link to="/" className={`${styles.ListItem} ${styles.DisabledLink}`}>
            SERVICES
          </Link>
          <div>
            <NavLink to={databaseLink} className={styles.SubBarListItem}>
              Databases
            </NavLink>
          </div>
          <Link to={allMetricsLink} className={styles.ListItem}>
            METRICS
          </Link>
          <div>
            <NavLink to={cpuLink} className={styles.SubBarListItem}>
              CPU
            </NavLink>
            <NavLink to={memoryLink} className={styles.SubBarListItem}>
              Memory
            </NavLink>
            {/* <Link to={storageLink} className={styles.SubBarListItem}>Storage</Link> */}
            <NavLink to={networkLink} className={styles.SubBarListItem}>
              Network
            </NavLink>
            {isAppMetricsPage && (
              <NavLink to={appLogsLink} className={styles.SubBarListItem}>
                Logs
              </NavLink>
            )}
          </div>
        </div>

        <div className={styles.SideBarFooterSection}>
          {isAppPage ? (
            <div>
              <Link
                to={{
                  pathname: `/users/${userID}/projects/${projectID}/apps/${appID}/settings`,
                  name,
                }}
              >
                <Settings className={styles.ListItem} />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={{
                  pathname: `/users/${userID}/projects/${projectID}/settings`,
                }}
              >
                <Settings className={styles.ListItem} />
              </Link>
            </div>
          )}

          <div className={`${styles.SideFooter} ${styles.StickBottom}`} >
            Copyright {new Date().getFullYear()} Crane Cloud. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

SideBar.defaultProps = {
  appLogsLink: "",
};

SideBar.propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.shape({}).isRequired,
  pageRoute: PropTypes.string.isRequired,
  cpuLink: PropTypes.string.isRequired,
  memoryLink: PropTypes.string.isRequired,
  databaseLink: PropTypes.string.isRequired,
  networkLink: PropTypes.string.isRequired,
  allMetricsLink: PropTypes.string.isRequired,
  appLogsLink: PropTypes.string,
};

export default SideBar;
