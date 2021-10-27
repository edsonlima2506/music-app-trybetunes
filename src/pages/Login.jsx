import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import '../styles/Login.css'

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      nomeDigitado: '',
      loading: false,
    };

    this.isDisabled = this.isDisabled.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    const { nomeDigitado } = this.state;
    const { moveToSearch } = this.props;
    this.setState({ loading: true });
    await createUser({ name: nomeDigitado });
    this.setState({ loading: false });
    moveToSearch();
  }

  isDisabled({ target }) {
    const MIN_NUMBER = 3;
    if (target.value.length >= MIN_NUMBER) {
      this.setState({
        isDisabled: false,
        nomeDigitado: target.value,
      });
    }
  }

  render() {
    const { isDisabled, loading } = this.state;
    return (
      <div data-testid="page-login" className="login">
        <input
          type="text"
          data-testid="login-name-input"
          className="nameInput"
          onChange={ this.isDisabled }
        />
        <button
          className="login-button"
          data-testid="login-submit-button"
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        { loading === true && <p>Carregando...</p> }
      </div>
    );
  }
}

Login.propTypes = {
  moveToSearch: PropTypes.func.isRequired,
};

export default Login;
