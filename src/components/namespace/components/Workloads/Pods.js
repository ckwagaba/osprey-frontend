import React, { Component } from 'react';
import axios from 'axios';

class Pods extends Component {
    constructor() {
        super()
        this.state = {
            podsRunning: 0,
            podsPending: 0,
            podsSucceding: 0,
            podsFailing: 0
        }
    }

    // link/nodes/{ this.props.clusterID }
    podsArray = [
        {
            podID: 345,
            name: "cm-acme-http-solver-nm6d5",
            node: "aci-aws-worker-3",
            status: "Running",
            restarts: "0",
            age: "8 days"
        },
        {
            podID: 346,
            name: "cm-acme-http-solver-mvnkd",
            node: "aci-aws-worker-2",
            status: "Running",
            restarts: "0",
            age: "10 days"
        },
        {
            podID: 347,
            name: "trial-prometheus-node-exporter-8hxsm",
            node: "aci-aws-master",
            status: "Running",
            restarts: "0",
            age: "10 days"
        }
    ]

    createTable = () => {
        return (<div>
            <table className="table table-striped" id="pods-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Node</th>
                        <th scope="col">Status</th>
                        <th scope="col">Restarts</th>
                        <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.podsArray.map((element) => {
                            return (
                                <tr key={this.podsArray.indexOf(element)}>
                                    <td> {element.name}</td>
                                    <td> {element.node} </td>
                                    <td> {element.status} </td>
                                    <td> {element.restarts} </td>
                                    <td> {element.age} </td>
                                    <td> {this.dropDown()} </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
        );
    }

    dropDown = () => {
        return (
            <div className="dropdown">
                <div data-toggle="dropdown">
                    <a href="#"> <span className="fa fa-ellipsis-v" aria-hidden="true"></span></a>
                </div>
                <div className="dropdown-menu">
                    <button className="dropdown-item" type="button">Edit YAML</button>
                    <button className="dropdown-item" type="button">Delete Pod</button>
                </div>
            </div>
        )
    }

    renderPodsTable = () => {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Pods
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }

    getPodsRunning = () => {
        const apiRoute = 'http://54.84.186.47:31765/monitor/pods';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        axios.get(proxyUrl + apiRoute)
        .then(response => {
            this.setState({ podsRunning: response.data.data.result[0].value[1]} );
        })
        .catch(error => console.log("Can't access " + apiRoute, error));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center">
                        Pods Running
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.podsRunning}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getPodsPending = () => {
        const apiRoute = 'http://54.84.186.47:31765/monitor/pods/pending';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        axios.get(proxyUrl + apiRoute)
        .then(response => {
            this.setState({ podsPending: response.data.data.result[0].value[1]} );
        })
        .catch(error => console.log("Can't access " + apiRoute, error));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center pending">
                        Pending Pods
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.podsPending}</h1>
                    </div>
                </div>
            </div>
        );
    }

    podsSucceding = () => {
        const apiRoute = 'http://54.84.186.47:31765/monitor/pods/succeeded';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';


        axios.get(proxyUrl + apiRoute)
        .then(response => {
            this.setState({ podsSucceding: response.data.data.result[0].value[1]} );
        })
        .catch(error => console.log("Can't access " + apiRoute, error));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Pods Succeeded
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.podsSucceding}</h1>
                    </div>
                </div>
            </div>
        );
    }

    podsFailing = () => {
        const apiRoute = 'http://54.84.186.47:31765/monitor/pods/failed';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        
        axios.get(proxyUrl + apiRoute)
        .then(response => {
            this.setState({ podsFailing: response.data.data.result[0].value[1]} );
        })
        .catch(error => console.log("Can't access " + apiRoute, error));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center fail">
                        Pods Failed
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.podsFailing}</h1>
                    </div>
                </div>
            </div>
        );
    }


    renderPods = () => {
        return (
            <div className="card parent">
                <div className="card-header">
                    Pods
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.getPodsRunning()}
                        {this.getPodsPending()}
                    </div>
                    <div className="row">
                        {this.podsSucceding()}
                        {this.podsFailing()}
                    </div>
                    <div className="row">
                        {this.renderPodsTable()}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderPods()
        );
    }
}

export default Pods;