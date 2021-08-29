import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Sidebar from './components/sidebar/Sidebar';

/** test를 위한 페이지로 개발 이후에는 제거될 페이지입니다 */
import SocketTest from './socket/socket-test';
import HttpTest from './socket/http-test';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/sidebar' component={Sidebar} />
          <Route exact path='/socketTest' component={SocketTest} />
          <Route exact path='/httpTest' component={HttpTest} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
