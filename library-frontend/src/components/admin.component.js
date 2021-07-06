import React, { Component } from 'react';
import axios from 'axios';

export default class Admin extends Component {
  constructor (props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    this.setState({
      name: '',
      password: ''
    })
  }

  onChangeEmail (e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword (e) {
    this.setState({
      password: e.target.value
    });
  }
  
  onSubmit (e) {
    axios.post('http://localhost:5000/admin/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => { 
      localStorage.setItem('token', response.data.token);
      window.location = '/create'
    })
    .catch(error => {
        console.log(error.response)
    });
  }

  render() {
    return (
      <div>
      <h3>Admin Login</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label>Email*: </label>
            <input 
              type="text" 
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
          </div>

          <div className="form-group">
            <label>Password*: </label>
            <input 
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
          </div>

          <div className="form-group">
              <input type="button" value="Log in" className="btn btn-primary" onClick={this.onSubmit}/>
          </div>

        </form>
      </div>
    );
  }
}