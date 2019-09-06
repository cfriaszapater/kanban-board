import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store";
import {
  changeLoginEditing,
  login,
  logout
} from "../../store/login/loginActions";
import { LoginState } from "../../store/login/loginReducer";

class LoginPage extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    // reset login status
    this.props.logout();
  }

  public handleChange = (event: React.SyntheticEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    this.props.changeLoginEditing({ [name]: value });
  };

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = this.props;
    this.props.login(username, password);
  };

  public render() {
    const { loggingIn, username, password, submitted } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-md-6 col-md-offset-3">
            <div>
              <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
                    />
                    {submitted && !password && (
                      <div className="help-block">Password is required</div>
                    )}
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                    {loggingIn && (
                      <img
                        alt="logging in"
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      />
                    )}
                    <Link style={{ float: "right" }} to="/register">
                      or Register
                    </Link>
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

interface LoginPropsToMapState {
  loggingIn: boolean;
  username: string;
  password: string;
  submitted: boolean;
}

interface LoginProps extends LoginPropsToMapState {
  changeLoginEditing: typeof changeLoginEditing;
  login: any;
  logout: any;
}

function mapStateToProps(state: AppState): LoginPropsToMapState {
  const { loggingIn, username, password, submitted } = state.login;
  return {
    loggingIn,
    password,
    submitted,
    username
  };
}

const connectedLoginPage = connect(
  mapStateToProps,
  { changeLoginEditing, login, logout }
)(LoginPage);
export { connectedLoginPage as LoginPage };
