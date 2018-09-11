import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReportGen from './components/ReportGenerator';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/getReport' component={ReportGen} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
