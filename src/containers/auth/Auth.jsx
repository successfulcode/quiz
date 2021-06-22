import React from 'react';
import styles from './Auth.module.css';
import Button from '../../components/UI/button/Button';
import Input from '../../components/UI/input/Input';
import is from 'is_js';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: 'test@test.lt',
        type: 'email',
        label: 'Email',
        errorMessage: 'Įveskite teisingą elektroninį paštą',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '123456',
        type: 'password',
        label: 'Password',
        errorMessage: 'Įveskite teisingą slaptažodį',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };
  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };
  registernHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };
  submittHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({ formControls, isFormValid });
  };
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.Auth}>
        <div>
          <h1>Autorizacija</h1>
          <form onSubmit={this.submittHandler} className={styles.AuthForm}>
            {this.renderInputs()}
            <Button
              type='success'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}>
              Enter
            </Button>
            <Button
              type='primary'
              onClick={this.registernHandler}
              disabled={!this.state.isFormValid}>
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, iaLogin) =>
      dispatch(auth(email, password, iaLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
