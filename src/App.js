import React from 'react';
import './App.css';
import { auth} from './config.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Create from './components/Create';
import Singleblog from './components/Singleblog';
import Blogdetail from './components/Blogdetail';
function App() {
  
  return (
    <div className="App">
      
      <Router>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home}>
          </Route>
          <ProtectedRoute path="/dashboard" component={Dashboard}></ProtectedRoute>
          <ProtectedRoute path="/create" component={Create}></ProtectedRoute>
          <ProtectedRoute path="/blog/:id" component={Blogdetail}></ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
