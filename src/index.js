import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';
// import {browserHistory} from 'react-router-dom';
// import "bootstrap/scss/bootstrap.scss";

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <Dashboard /> */}
//     <App/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render((
  <Router>
  <App/>
      <Route path = "/" render = {()=> <Redirect to="/home"></Redirect>}/>
      <Route path = "/home" component={Home}/>
      <Route path = "/dash" component = {Dashboard} />
      <Route path = "/contact"/>
  </Router>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
