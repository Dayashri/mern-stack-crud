import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReportGen from './components/ReportGenerator';
import DbInstaller from './components/DbInstaller';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/getReport' component={ReportGen} />
        <Route path='/dbSetUp' component={DbInstaller} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
