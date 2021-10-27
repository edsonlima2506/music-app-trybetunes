import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      login: false,
    };

    this.moveToSearch = this.moveToSearch.bind(this);
  }

  moveToSearch() {
    this.setState({
      login: true,
    });
  }

  render() {
    const { login } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login }>
            { login === true ? <Redirect to="/search" />
              : <Login moveToSearch={ this.moveToSearch } /> }
          </Route>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" render={ () => <Album /> } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
