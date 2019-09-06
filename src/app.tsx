import React from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import KanbanBoard from "./components/board/kanbanBoard";
import { LoginPage } from "./components/login/loginPage";
import { PrivateRoute } from "./components/privateRoute";
import { RegisterPage } from "./components/register/registerPage";
import { AppState } from "./store";
import { alertActions } from "./store/alert/alertActions";
import { Alert } from "./store/alert/types";
import { NameToCardMap, NameToColumnMap } from "./store/board/types";
import { history } from "./util/history";

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    history.listen(() => {
      // clear alert on location change
      props.dispatch(alertActions.clear());
    });
  }

  public render() {
    const { alert } = this.props;
    return (
      <div className="App">
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <div>
            <PrivateRoute
              exact
              path="/"
              component={KanbanBoard}
              cards={this.props.cards}
              columns={this.props.columns}
              columnOrder={this.props.columnOrder}
              loading={this.props.loading}
              error={this.props.error}
              dispatch={this.props.dispatch}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </div>
        </Router>
      </div>
    );
  }
}

interface AppProps {
  dispatch: ThunkDispatch<{}, {}, any>;
  cards: NameToCardMap;
  columns: NameToColumnMap;
  columnOrder: string[];
  loading: boolean;
  error: Error | null;
  alert: Alert;
}

const mapStateToProps = (state: AppState) => ({
  alert: state.alert,
  cards: state.board.cards,
  columnOrder: state.board.columnOrder,
  columns: state.board.columns,
  error: state.board.error,
  loading: state.board.loading
});

export default connect(mapStateToProps)(App);
