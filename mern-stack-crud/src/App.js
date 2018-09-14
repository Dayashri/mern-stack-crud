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
    var employeeId=this.state.employeeId;
    var loginId=this.state.loginId;
    axios.get('/api/reskill/getUserName').then(response =>{
      console.log("before set");
      console.log("userResp:"+response.data.userFlag);
      if(response.data.userFlag==0){
        showEmployeeForm=false;
        showNotAuthorized=true;
        employeeId=null;
        loginId=null;
      }else{
        showEmployeeForm=true;
        showNotAuthorized=false;
        employeeId=response.data.employeeId,
        loginId=response.data.loginId
      }
      this.setState({
        showEmployeeForm:showEmployeeForm,
        showNotAuthorized:showNotAuthorized,
        employeeId:employeeId,
        loginId:loginId
      });
      console.log("after set");
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
