import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InformationBar from "../InformationBar";
import Header from "../Header";
import PrimaryButton from "../PrimaryButton";
import deleteProject, {
  clearDeleteProjectState,
} from "../../redux/actions/deleteProject";
import updateProject, {
  clearUpdateProjectState,
} from "../../redux/actions/updateProject";
import Spinner from "../Spinner";
import Modal from "../Modal";
import SideBar from "../SideBar";
import TextArea from "../TextArea";
import Feedback from "../Feedback";
import DeleteWarning from "../DeleteWarning";
import BlackInputText from "../BlackInputText";
import styles from "./ProjectSettingsPage.module.css";

class ProjectSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const projectInfo = JSON.parse(localStorage.getItem("project"));
    const { name, description } = projectInfo;

    this.state = {
      openUpdateModal: false,
      openDeleteAlert: false,
      openDropDown: false,
      projectName: name ? name : "",
      projectDescription: description ? description : "",
      error: "",
    };

    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateProjectName = this.validateProjectName.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isDeleted } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
    }
  }

  validateProjectName(name) {
    if (/^[a-z]/i.test(name)) {
      if (name.match(/[^-a-zA-Z]/)) {
        return "false_convention";
      }
      return true;
    }
    return false;
  }

  handleChange(e) {
    const { error } = this.state;
    const { errorMessage, clearUpdateProjectState } = this.props;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (errorMessage) {
      clearUpdateProjectState();
    }
    if (error) {
      this.setState({
        error: "",
      });
    }
  }

  handleSubmit() {
    const { projectName, projectDescription } = this.state;
    const {
      updateProject,
      name,
      description,
      match: {
        params: { projectID },
      },
    } = this.props;

    if (projectName.trim() !== name || projectDescription.trim() !== description) {
      if (!projectName.trim() || !projectDescription.trim()) {
        this.setState({
          error: "please provide either a new name or description",
        });
      } else {
        if (projectName.trim() !== name && projectDescription.trim() === description) {
          if (!this.validateProjectName(projectName.trim())) {
            this.setState({
              error: "name should start with a letter",
            });
          } else if (
            this.validateProjectName(projectName.trim()) === "false_convention"
          ) {
            this.setState({
              error: "name may only contain letters and a hypen -",
            });
          } else if (projectName.trim().length > 22) {
            this.setState({
              error: "project name cannot exceed 22 characters",
            });
          } else {
            const newProject = { name: projectName.trim() };
            updateProject(projectID, newProject);
          }
        }

        if (projectName.trim() === name && projectDescription.trim() !== description) {
          const newProject = { description: projectDescription.trim() };
          updateProject(projectID, newProject);
        }

        if (projectName.trim() !== name && projectDescription.trim() !== description) {
          if (!this.validateProjectName(projectName.trim())) {
            this.setState({
              error: "name should start with a letter",
            });
          } else if (
            this.validateProjectName(projectName.trim()) === "false_convention"
          ) {
            this.setState({
              error: "name may only contain letters and a hypen -",
            });
          } else {
            const newProject = {
              name: projectName.trim(),
              description: projectDescription.trim(),
            };
            updateProject(projectID, newProject);
          }
        }
      }
    }
  }

  handleDeleteProject(e, projectID) {
    const { deleteProject } = this.props;
    e.preventDefault();
    deleteProject(projectID);
  }

  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    const { clearDeleteProjectState } = this.props;
    clearDeleteProjectState();
    this.setState({ openDeleteAlert: false });
  }
  renderRedirect = () => {
    const { isDeleted, isUpdated } = this.props;
    const { userID } = this.props.match.params;
    if (isDeleted || isUpdated) {
      return <Redirect to={`/users/${userID}/projects`} noThrow />;
    }
  };

  render() {
    const {
      match: { params },
      isDeleting,
      isDeleted,
      isUpdating,
      message,
      isFailed,
      isUpdated,
      errorMessage,
    } = this.props;
    const projectInfo = JSON.parse(localStorage.getItem("project"));
    const name = projectInfo.name;
    const description = projectInfo.description;
    const { openDeleteAlert, projectName, projectDescription, error } = this.state;

    const { projectID, userID } = params;

    return (
      <div className={styles.Page} >
        {isUpdated || isDeleted ? this.renderRedirect() : null}
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
            <SideBar
              name={name}
              params={params}
              description={description}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/metrics`}
              cpuLink={`/users/${userID}/projects/${projectID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/network/`}
            />
          </div>
          <div className={styles.MainContentSection}>
            <div className={styles.InformationBarSection}>
              <InformationBar header="Settings" />
            </div>
            <div className={styles.ContentSection}>
              <div>
                <div
                  onSubmit={(e) => {
                    this.handleSubmit();
                    e.preventDefault();
                  }}
                >
                  <div className={styles.UpdateForm}>
                    <BlackInputText
                      placeholder="Project Name"
                      name="projectName"
                      value={projectName}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <TextArea
                      placeholder="Description"
                      name="projectDescription"
                      value={projectDescription}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    {(errorMessage || error) && (
                      <Feedback
                        type="error"
                        message={errorMessage ? "you cant update only the description" : error}
                      />
                    )}

                    <PrimaryButton
                      label={isUpdating ? <Spinner /> : "update project"}
                      onClick={this.handleSubmit}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.DeleteButtonDiv}>
                <PrimaryButton
                  label="Delete Project"
                  className={styles.DeleteBtn}
                  onClick={this.showDeleteAlert}
                />
              </div>
              {openDeleteAlert && (
                <div className={styles.ProjectDeleteModel}>
                  <Modal
                    showModal={openDeleteAlert}
                    onClickAway={this.hideDeleteAlert}
                  >
                    <div className={styles.DeleteProjectModel}>
                      <div className={styles.DeleteProjectModalUpperSection}>
                        <div className={styles.DeleteDescription}>
                          Are you sure you want to delete&nbsp;
                          <span>{projectName}</span>
                          &nbsp; ?
                          <DeleteWarning />
                        </div>
                      </div>

                      <div className={styles.DeleteProjectModalLowerSection}>
                        <div className={styles.DeleteProjectModelButtons}>
                          <PrimaryButton
                            label="cancel"
                            className={styles.CancelBtn}
                            onClick={this.hideDeleteAlert}
                          />
                          <PrimaryButton
                            label={isDeleting ? <Spinner /> : "Delete"}
                            className={styles.DeleteBtn}
                            onClick={(e) =>
                              this.handleDeleteProject(e, params.projectID)
                            }
                          />
                        </div>

                        {isFailed && message && (
                          <Feedback message={message} type="error" />
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectSettingsPage.propTypes = {
  isFailed: PropTypes.bool,
  clearDeleteProjectState: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  name: PropTypes.string,
  isUpdating: PropTypes.bool,
  description: PropTypes.string,
  message: PropTypes.string,
  isUpdated: PropTypes.bool,
  isDeleted: PropTypes.bool,
};

ProjectSettingsPage.defaultProps = {
  message: "",
  isUpdated: false,
  isDeleted: false,
  name: "",
  description: "",
  isUpdating: false,
};

const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed, clearDeleteProjectState, message } =
    state.deleteProjectReducer;

  const { isUpdated, isUpdating, errorMessage, clearUpdateProjectState } =
    state.updateProjectReducer;
  return {
    isUpdated,
    isUpdating,
    message,
    isDeleting,
    isFailed,
    isDeleted,
    errorMessage,
    clearDeleteProjectState,
    clearUpdateProjectState,
  };
};

const mapDispatchToProps = {
  deleteProject,
  updateProject,
  clearDeleteProjectState,
  clearUpdateProjectState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSettingsPage);
