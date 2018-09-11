import React from 'react';
import { Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import ExportToExcel from './ExportToExcel';
import axios from 'axios';
import '../App.css';

class ReportGen extends React.Component {
    state = {
        employeeSkills:[]
    }
    componentWillMount(){
        axios.get('/api/reskill/getAll').then(response =>{
            this.setState({
                employeeSkills: response.data
            });
        }).catch(error => {
            //console.log(error.response.data.error)
        });
    }
    render(){
        return(
            <div>
                <AppNavbar/>
                <Container className="expCls">
                    <ExportToExcel {...this.state} />
                </Container>
            </div>
        )
    }

}
export default ReportGen;