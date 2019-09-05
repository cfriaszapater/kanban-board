import React from "react";
import { connect } from "react-redux";
import KanbanBoard from "./kanbanBoard";
import { history } from "./_helpers";
import { alertActions } from "./store/alert/alertActions";
import { PrivateRoute } from "./_components";
import { LoginPage } from "./LoginPage";
import { Router, Route } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "./store";
import { NameToColumnMap, NameToCardMap, Alert } from "./store/board/types";

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    history.listen(() => {
      // clear alert on location change
      props.dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    console.log(JSON.stringify(alert));
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
  columnOrder: state.board.columnOrder,
  columns: state.board.columns,
  cards: state.board.cards,
  loading: state.board.loading,
  error: state.board.error,
  alert: state.alert
});

export default connect(mapStateToProps)(App);
