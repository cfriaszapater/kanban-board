import React from "react";
import { connect } from "react-redux";
import {
  createUser,
  changeRegisterEditing
} from "../../store/register/registerActions";
import { RegisterState } from "../../store/register/registerReducer";
import { AppState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { ContentEditableEvent } from "react-contenteditable";

class RegisterPage extends React.Component<RegisterProps, RegisterState> {
  handleChangeUsername = (event: ContentEditableEvent) => {
    const { value } = event.target;
    console.log("handleChangeUsername", value);
    this.props.dispatch(changeRegisterEditing({ username: value }));
  };

  handleChangePassword = (event: ContentEditableEvent) => {
    const { value } = event.target;
    console.log("handleChangePassword", value);
    this.props.dispatch(changeRegisterEditing({ password: value }));
  };

  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { username, password } = this.props;
    console.log("handleSubmit", username, password);
    if (username && password) {
      this.props.dispatch(
        createUser({ username: username, password: password })
      );
    }
  };

  render() {
    const { registerInProgress, username, password, submitted } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-md-6 col-md-offset-3">
            <div>
              <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                  <div
                    className={
                      "form-group" +
                      (submitted && !username ? " has-error" : "")
                    }
                  >
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={this.handleChangeUsername}
                    />
                    {submitted && !username && (
                      <div className="help-block">Username is required</div>
                    )}
                  </div>
                  <div
                    className={
                      "form-group" +
                      (submitted && !password ? " has-error" : "")
                    }
                  >
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={this.handleChangePassword}
                    />
                    {submitted && !password && (
                      <div className="help-block">Password is required</div>
                    )}
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary">Register</button>
                    {registerInProgress && (
                      <img
                        alt="registration in progress"
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface RegisterProps {
  dispatch: ThunkDispatch<{}, {}, any>;
  registerInProgress?: boolean;
  submitted?: boolean;
  username?: string;
  password?: string;
}

function mapStateToProps(state: AppState) {
  const { registerInProgress, username, password, submitted } = state.register;
  return {
    registerInProgress,
    username,
    password,
    submitted
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
