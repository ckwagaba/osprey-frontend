import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "../../assets/css/signin.css";

import loginSuccess from '../../redux/actions/loginSuccess';
import axios from 'axios';
import { BASE_URL } from '../../config';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: '',
        password: ''
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

    handleSubmit = (event) => {
      event.preventDefault();
      /**
       * make api call
       */
      fetch(BASE_URL + '/login', {
        method: 'POST',
        data: this.state.data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then (response => {
        // dispatch action on success
        console.log(response);

        loginSuccess({
          user: this.state,
          accessToken: response.access_token
        })
      }).catch(error => {
        console.log(error);
      });
    }

  render() {
    return (
      <div className="FormCenter">

        <form className="FormFields" onSubmit={this.handleSubmit}>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">E-mail Address</label>
            <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Password</label>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20">Sign In</button><Link to="/register" className="FormField__Link">Create an account</Link>
          </div>

        </form>

      </div>
    );
  }
}

export default SignInForm;
