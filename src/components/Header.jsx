import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      loadComplete: false,
      nome: '',
    };

    this.callGetUser = this.callGetUser.bind(this);
  }

  componentDidMount() {
    this.callGetUser();
  }

  callGetUser() {
    this.setState({
      loading: true,
    }, async () => {
      const userName = await getUser();
      this.setState({
        nome: userName.name,
        loading: false,
        loadComplete: true,
      });
    });
  }

  render() {
    const { loading, loadComplete, nome } = this.state;
    return (
      <header data-testid="header-component">
        { loading === true && <h1>Carregando...</h1> }
        { loadComplete === true && <h1 data-testid="header-user-name">{ nome }</h1> }
        <Link to="/search" data-testid="link-to-search" />
        <Link to="/favorites" data-testid="link-to-favorites" />
        <Link to="/profile" data-testid="link-to-profile" />
      </header>
    );
  }
}

export default Header;
