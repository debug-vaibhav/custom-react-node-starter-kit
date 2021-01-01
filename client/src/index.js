import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact={true} path={'/'} component={Home} />
                        {/* <Route component={Error} /> */}
                    </Switch>
                </div>
            </Router>
        );
    }
}
render(<App />, document.getElementById('app'));
