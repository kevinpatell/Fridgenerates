import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route }  from 'react-router-dom';
import Landing from './LandingPage';
import RecipeDetails from './RecipeDetails';
import TopNav from './TopNav';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/current/user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(data)
        if (json.user) {
          localStorage.setItem('token', json.token);
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.user.username
          });
        } else {
          console.log('please enter blah')
        };
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(data)
        if (json.user) {
          localStorage.setItem('token', json.token);
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.username
          });
        } else {
          console.log("No user", data)
          this.setState({errors: data})
        };
      }).catch((data) => {
        console.log("Catch:", data)
        this.setState({errors: data}) 
      })
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }


    return (
      <div className="App">
          <TopNav
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
            />
          {form}
            <h3 className="welcome">
              {this.state.logged_in
                ? `Hello, ${this.state.username}`
                : ''}
            </h3>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/recipe-details" component={RecipeDetails} />
              {/* <Route path="/login" component={LoginForm} /> */}
              {/* <Route path="/signup" component={SignupForm} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;