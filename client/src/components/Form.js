import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  state = {
    username: "",
    password: ""
  }

  submit(e) {
    e.preventDefault();

    console.log(this.state.username);
    console.log(this.state.password);

    postData('join', {username: this.state.username, password: this.state.password})
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
  }


  render() {
    return (
      <form onSubmit={e => this.submit(e)}>
        <div className="form-group">
          <input className="form-control" value={this.state.username} onChange={e => this.setState({username: e.target.value})} type="text" placeholder="Username" />
        </div>

        <div className="form-group">
          <input className="form-control" value={this.state.password} onChange={e => this.setState({password: e.target.value})} type="text" placeholder="Password" />
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

Form.propTypes = {
};




function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native JavaScript objects
}
