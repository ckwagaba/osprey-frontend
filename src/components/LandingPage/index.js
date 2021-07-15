import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NewHeader from "../NewHeader";
import LandingFooter from "../LandingFooter";
import { ReactComponent as InfrastrucurePic } from "../../assets/images/infrastructure.svg";
import { ReactComponent as RightArrow } from "../../assets/images/rightArrow.svg";
import { ReactComponent as Databases } from "../../assets/images/databases.svg";
import { ReactComponent as Monitoring } from "../../assets/images/monitoring.svg";
import { ReactComponent as Container } from "../../assets/images/container.svg";
import { ReactComponent as Orch } from "../../assets/images/orcherstration.svg";
import { ReactComponent as Registry } from "../../assets/images/registry.svg";
import { ReactComponent as Cloud } from "../../assets/images/multicloud.svg";
import styles from "./LandingPage.module.css";

const LandingPage = (props) => {
  let { user } = props;
  if (user.data.id === undefined) {
    user = false;
  }
  return (
    <div className={styles.LandingPageMain}>
      <NewHeader />
      <div className={styles.LandingPageMainContainer}>
        <div className={styles.LandingPageMainContent}>
          <div className={styles.LandingPageMainContentInfo}>
            <div className={styles.LandingPageMainContentTitle}>
              Managed Cloud Services
            </div>
            <div className={styles.LandingParagraph}>
              Crane Cloud is an open source multi-cloud software platform for
              cloud-native application deployment and management.
            </div>
            <Link to="/register">
              <button className={styles.FreeTrialButton}>
                <div>Start Free Trial</div>
                <RightArrow />
              </button>
            </Link>
          </div>
          <div className={styles.LandingPageMainContentImg}>
            <InfrastrucurePic className={styles.LandingPageInfrastructurePic} />
          </div>
        </div>
        <div className={styles.LandingPageWhySectionWithBanner}>
          <div className={styles.LandingPageWhySection}>
            <div className={styles.LandingPageWhySectionTitle}>
              <h2>Why Crane Cloud</h2>
            </div>
            <div className={styles.WhySectionContent}>
              <div className={styles.DataCenterImage}>
                <img
                  alt="data-center"
                  src={require("../../assets/images/server_image.jpg")}
                />
              </div>

              <div className={styles.WhySectionChildContainer}>
                <div className={styles.WhySectionItem}>
                  <div className={styles.WhySectionCardTitle}>Infrastructure</div>
                  <div>Fast, agile, and resilient infrastructure.</div>
                </div>
                <div className={styles.WhySectionItem}>
                  <div className={styles.WhySectionCardTitle}>Cost</div>
                  <div>
                    Reduce costs and save money by getting billed only what you
                    utilize.
                  </div>
                </div>
                <div className={styles.WhySectionItem}>
                  <div className={styles.WhySectionCardTitle}>Security</div>
                  <div>
                    Images are automatically scanned for vulnerabilities, and
                    deployed with a free SSL certificate.
                  </div>
                </div>
                <div className={styles.WhySectionItem}>
                  <div className={styles.WhySectionCardTitle}>Support</div>
                  <div>
                    Create a ticket, chat, or call a specialist regarding any
                    queries.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.PageBannerSection}>
            <div className={styles.LeftPageBannerSection}>
              <div className={styles.LeftPageBannerInner}>
                <div>
                  <h2>Migrate to the cloud</h2>
                  <p className={styles.BannerParagraph}>
                    Governments and institutions are urged to begin digital
                    transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.LandingPageWhySection}>
          <div className={styles.LandingPageWhySectionTitle}>
            <h2>Explore Crane Cloud Solutions</h2>
          </div>
          <div className={styles.SolutionsSection}>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Container />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Containers</h3>
                <div>
                  Quickly deploy modern, cloud-native applications or migrate
                  legacy systems to enable rapid incorporation of user feedback
                  for continuous improvement.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Orch />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Orcherstration</h3>
                <div>
                  We use Kubernetes to automate application rollouts, rollbacks,
                  and scaling to ensure your users never experience any
                  downtime.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Databases />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Databases</h3>
                <div>
                  Create, migrate, and manage data with secure, reliable, and
                  high performance SQL and NoSQL databases from Crane Cloud.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <div>
                  <Registry />
                </div>
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Registry</h3>
                <div>
                  Store and distribute Docker images in a secure, private
                  repository.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Cloud />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>MultiCloud</h3>
                <div>
                  Enjoy the flexibility of moving workloads between public and
                  private clouds, as needs and costs fluctuate.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Monitoring />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Monitoring</h3>
                <div>
                  Analyze metrics and logs about your applications. With this
                  transparency, you’re billed only what you utilize.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.LandingPageFooter}>
        <LandingFooter />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(withRouter(LandingPage));
