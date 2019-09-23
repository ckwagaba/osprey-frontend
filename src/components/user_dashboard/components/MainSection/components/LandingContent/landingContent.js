import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import { BASE_URL, PROXY_URL } from '../../../../../../config';

import UserResourceUsage from "./components/user_resource_usage/userResourceUsage";

import "./LandingContent.css";

class LandingContent extends Component {
  state = {
    deploymentsListVisible: false,
    organizationsListVisible: false,
    organizationsArray: [],
    deploymentsArray: []
  }

  componentDidMount() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      }
    };
    axios.get(PROXY_URL + BASE_URL + '/user/get/organisations', config)
      .then(response => this.setState({ organizationsArray: response.data }))
      .catch(error => console.log(error));
  }

  toggleDeployments = () => {
    const status = this.state.deploymentsListVisible;
    this.setState({ deploymentsListVisible: !status });
  }

  toggleOrganizations = () => {
    const status = this.state.organizationsListVisible;
    this.setState({ organizationsListVisible: !status });
  }

  render() {
    return (
      <div>
        <div className="row align-items-center justify-content-center">
          {/* <div className="col">
                    <div className="card">
                        { this.returnDeploymentsCard() }
                    </div>
                </div> */}

          <div className="col-9">
            <div className="card">
              {this.returnOrganizationsCard()}
            </div>
          </div>
        </div>
        <UserResourceUsage />
      </div>
    );
  }

  returnDeploymentsCard = () => {
    let numberOfErrors = 0;
    let numberOfOkey = 0;
    let totalBilling = 0;

    this.state.deploymentsArray.map((deployment) => {
      if (deployment.status === "okey") {
        numberOfOkey = numberOfOkey + 1;
      } else if (deployment.status === "error") {
        numberOfErrors = numberOfErrors + 1;
      }

      totalBilling = parseFloat(totalBilling) + parseFloat(deployment.billing);
    })

    return (<div className="card-body text-center">
      <h4 onClick={this.toggleDeployments} className="hoverCursor">
        <span className={this.state.deploymentsListVisible ? "oi oi-minus pushPlusLeft" : "fa fa-plus pushPlusLeft"} ></span>
        Deployments
            <span className="badge badge-success aLittleMargin">Okay {numberOfOkey}</span>
        <span className="badge badge-danger aLittleMargin">Errors {numberOfErrors}</span>
      </h4>

      <div className={this.state.deploymentsListVisible ? "deploymentsListVisible" : "deploymentsListInvisible"}>
        <table className="table table-borderless text-left">
          <thead>
            <th>Name</th>
            <th>Status</th>
            <th>Billing  (ugx {totalBilling})</th>
          </thead>
          <tbody>
            {
              this.state.deploymentsArray.map((deployment) => {
                return (
                  <tr >
                    <td> <Link to={`/deployments/${deployment.deploymentID}`}> {deployment.name} </Link></td>
                    <td><span className={`badge badge-${deployment.status === 'okey' ? 'success' : 'danger'} aLittleMargin`}>{deployment.status}</span></td>
                    <td>{deployment.billing}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>)
  }

  returnOrganizationsCard = () => {
    let numberOfErrors = 0;
    let numberOfOkey = 0;
    let totalBilling = 0;

    this.state.organizationsArray.map((org) => {
      if (org.status === "okey") {
        numberOfOkey = numberOfOkey + 1;
      } else if (org.status === "error") {
        numberOfErrors = numberOfErrors + 1;
      }

      totalBilling = parseFloat(totalBilling) + parseFloat(org.billing);
    })

    return (<div className="card-body text-center">
      <h4 onClick={this.toggleOrganizations} className="hoverCursor">
        <span className={this.state.organizationsListVisible ? "oi oi-minus pushPlusLeft" : "fa fa-plus pushPlusLeft"} ></span>
        Organizations
            <span className="badge badge-success aLittleMargin">Okay {numberOfOkey}</span>
        <span className="badge badge-danger aLittleMargin">Errors {numberOfErrors}</span>
      </h4>

      <div className={this.state.organizationsListVisible ? "organizationsListVisible" : "organizationsListInvisible"}>

        <table className="table table-borderless text-left">
          <thead>
            <th>Name</th>
            <th>Status</th>
            <th>Billing  (ugx {totalBilling})</th>
          </thead>
          <tbody>
            {
              this.state.organizationsArray.map((org, index) => {
                return (
                  <tr key={index}>
                    <td> <Link to={`/user-organizations/${org.orgID}`}> {org.name} </Link></td>
                    <td><span className={`badge badge-${org.status === 'okey' ? 'success' : 'danger'} aLittleMargin`}>{org.status}</span></td>
                    <td>{org.billing}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.accessToken
  }
}

export default withRouter(connect(mapStateToProps)(LandingContent));

