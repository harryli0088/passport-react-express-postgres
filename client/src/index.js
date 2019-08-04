import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


import { Router, Route, Redirect, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

// route components
import App from './App';


const proxy = process.env.REACT_APP_PROXY; //set the proxy depending on if we are in prod or dev


const browserHistory = createBrowserHistory();


class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    return (
      <Router history={browserHistory}>

        <Switch>
          <Route exact path="/" render={(props) => <App {...props} proxy={proxy} />}/>

          {/* <VerifiedRoute exact path="/addMember/:eventId" component={AddMemberContainer} org={this.props.org}/> */}


          {/* <Route exact path="/addUser" render={(props) => <AddUser {...props} proxy={proxy} />}/> */}

          {/* <Route exact path="/terms" component={Terms}/> */}

          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    );
  }
}







ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
