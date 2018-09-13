import React from 'react';
import AppNavbar from './components/AppNavbar';
import EmployeeForm from './components/EmployeeForm';
import NotAuhorizedPage from './components/NotAuhorizedPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state={
    showEmployeeForm:false,
    showNotAuthorized:false,
    employeeId:null,
    loginId:null,
  }

  componentWillMount(){
    var showNotAuthorized=this.state.showNotAuthorized;
    var showEmployeeForm=this.state.showEmployeeForm;
    axios.get('/api/reskill/getUserName').then(response =>{
      debugger
      if(response.data.length==0){
        showEmployeeForm=false;
        showNotAuthorized=true;
      }else{
        showEmployeeForm=true;
        showNotAuthorized=false;
      }
      this.setState({
        showEmployeeForm:showEmployeeForm,
        showNotAuthorized:showNotAuthorized,
        employeeId:response.data[0].employeeId,
        loginId:response.data[0].loginId
      })

    }).catch(error => {
      //console.log(error.response.data.error)
    });
  }
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <div style={{display:(this.state.showEmployeeForm?'block':'none')}}>
        <EmployeeForm  {...this.state}/>
        </div>
        <div  style={{display:(this.state.showNotAuthorized?'block':'none')}}>
        <NotAuhorizedPage/>
        </div>
      </div>
    );
  }
}

export default App;