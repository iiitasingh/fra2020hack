import React from 'react';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './components/Loginscreen';


function App() {
  return (
  <div className="container">
  <Router>
      <div>
          <PrivateRoute exact path="/" component={Navbar} />
          <Route path="/login" component={Login} />
      </div>
  </Router>
</div>
  );
}

export default App;
