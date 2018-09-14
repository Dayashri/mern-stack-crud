import React from 'react';
import AppNavbar from './components/AppNavbar';
import EmployeeForm from './components/EmployeeForm';
import NotAuhorizedPage from './components/NotAuhorizedPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <EmployeeForm/>
        </div>
    );
  }
}

export default App;
