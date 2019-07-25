import React from "react";
import "bootstrap";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Route, browserHistory, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
// import "../assets/styles/scss/custom-bootstrap.scss";
// import "../assets/styles/css/common.css";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <div>
            <Switch>
              <Route exact={true} path={"/"} component={Home} />
              {/* <Route component={Error} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
render(<App />, document.getElementById("app"));
