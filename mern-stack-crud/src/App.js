import React from 'react';
import AppNavbar from './components/AppNavbar';
import EmployeeForm from './components/EmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';
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