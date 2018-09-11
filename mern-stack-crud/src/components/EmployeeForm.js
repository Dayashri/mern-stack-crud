import React from 'react';
import { Container,Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import '../App.css';

class EmployeeForm extends React.Component {
    state = {
        selectedOption1: '',
        selectedOption2: '',
        messageFromServer:'',
        fName:'',
        fNameErr:'',
        lName:'',
        lNameErr:'',
        empId:'',
        empErr:'',
        skill1Err:'',
        skill2Err:'',
        subMandatoryErr:''
    }

    handleChange1 = (selectedOption) => {
        var skill1Err="";
        if(selectedOption.length===0){
            skill1Err="This is a mantory Field"
        }else{
            skill1Err="";
        }
        this.setState({ selectedOption1:selectedOption,skill1Err:skill1Err });
    }
    
    handleChange2 = (selectedOption) => {
        var skill2Err="";
        if(selectedOption.length===0){
            skill2Err="This is a mantory Field"
        }else{
            skill2Err="";
        }
        this.setState({ selectedOption2:selectedOption,skill2Err:skill2Err });
    }
    onChangeFname(e){
        e.preventDefault();
        var fNameErr=this.state.fNameErr;
        var inputVal=e.target.value;
        var subMandatoryErr="";
        if(inputVal===""){
            fNameErr="This is a mantory Field";
            subMandatoryErr="";
        }else{
            fNameErr="";
        }
        this.setState({
            fNameErr:fNameErr,
            fName:inputVal,
            subMandatoryErr:subMandatoryErr
        })
    }
    onChangeLname(e){
        e.preventDefault();
        var subMandatoryErr="";
        var lNameErr=this.state.lNameErr;
        var inputVal=e.target.value;
        if(inputVal===""){
            lNameErr="This is a mantory Field";
        }else{
            lNameErr="";
        }
        this.setState({
            lNameErr:lNameErr,
            lName:inputVal,
            subMandatoryErr:subMandatoryErr
        })
    }
    onChangeEmpId(e){
        e.preventDefault();
        var empErr=this.state.empErr;
        var subMandatoryErr="";
        var inputVal=e.target.value;
        if(inputVal===""){
            empErr='This is a mandatory field';
        }
        else if(isNaN(inputVal)){
            empErr='Employee Id Can be Numeric only';
        }else if(!(/^[0-9]{1,6}$/.test(inputVal))){
            empErr='Invalid Employee Id';
        }else{
            empErr='';
        }
        this.setState({
            empErr:empErr,
            empId:inputVal,
            subMandatoryErr:subMandatoryErr
        })
    }

    handleSubmit(e){
        e.preventDefault();
        var subMandatoryErr="";
        var fnameFlag=this.state.fNameErr.length===0 && this.state.fName!=="";
        var lnameFlag=this.state.lNameErr.length===0 && this.state.lName!=="";
        var empFlag=this.state.empErr.length===0 && this.state.empId!=="";
        var skill1Flag=this.state.skill1Err.length===0 && this.refs.skill1.state.value.length!==0;
        var skill2Flag=this.state.skill2Err.length===0 && this.refs.skill2.state.value.length!==0;
        if(fnameFlag&&lnameFlag&&empFlag&&skill1Flag&&skill2Flag){
            var skillSet1=[];
            var skillSet2=[];
            this.refs.skill1.state.value.forEach(function(skillset1){
                skillSet1.push(skillset1.value);
            });
            this.refs.skill2.state.value.forEach(function(skillset2){
                skillSet2.push(skillset2.value);
            });
            subMandatoryErr="";
            var querystring={
                fName: this.state.fName,
                lName:this.state.lName,
                employeeId: this.state.empId,
                skill1: skillSet1,
                skill2: skillSet2
            }
            axios.post('/api/reskill/addSkill',querystring).then(response =>{
                this.setState({
                    messageFromServer: response.data
                });
            }).catch(error => {
                //console.log(error.response.data.error)
            });
        }else{
            subMandatoryErr="Please Fill all mandatory Fields"
        }
        this.setState({
            subMandatoryErr:subMandatoryErr
        });
    }

    addPortifolio1(e){
        e.preventDefault();
        var querystring={
            "name":"People Solutions",
            "DM":["Sudip Ghose"],
            "LOB":["Hari","Balaji G"]
            };
        axios.post('/api/reskill/addPortifolio',querystring).then(response =>{
            this.setState({
                messageFromServer: response.data
            });
        }).catch(error => {
            //console.log(error.response.data.error)
        });

    }

    render() {
        const selectedOption1  = this.state.selectedOption1;
        const selectedOption2  = this.state.selectedOption2;
        const value1 = selectedOption1 && selectedOption1.value;
        const value2 = selectedOption2 && selectedOption2.value;
        const options1 = [
            {
                label: 'UI', options: [
                    { label: 'Angular Js', value: 'Angular Js' },
                    { label: 'React Js', value: 'React Js' }
                ]
            },
            {
                label: 'SQL', options: [
                    { label: 'MongoDB', value: 'MongoDB' },
                    { label: 'Cassandra', value: 'Cassandra' },
                    { label: 'NoSQL', value: 'NoSQL' }
                ]
            }
        ];
        const options2 = [
            {
                label: 'DevOps', options: [
                    { label: 'Jenkins', value: 'Jenkins' },
                    { label: 'OneOps', value: 'OneOps' },
                    { label: 'Azure', value: 'Azure' }
                ]
            }
        ];
        
        return (
        <Container>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <Label for="fName">First Name</Label>
                    <Input type="text" name="fName" id="fName" ref="fName" onChange={this.onChangeFname.bind(this)}/>
                    <span className="errCls">{this.state.fNameErr}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="lName">Last Name</Label>
                    <Input type="text" name="lName" id="lName" ref="lName" onChange={this.onChangeLname.bind(this)}/>
                    <span className="errCls">{this.state.lNameErr}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="employeeId">Employee Id</Label>
                    <Input type="text" name="employeeId" id="employeeId" ref="employeeId" onChange={this.onChangeEmpId.bind(this)}/>
                    <span className="errCls">{this.state.empErr}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelectMulti">Skill Set 1</Label>
                    <Select ref="skill1"
                        isMulti
                        value={value1}
                        options={options1}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleChange1}
                    />
                    <span className="errCls">{this.state.skill1Err}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelectMulti">Skill Set 2</Label>
                    <Select ref="skill2"
                        isMulti
                        value={value2}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleChange2}
                        options={options2}
                    />
                    <span className="errCls">{this.state.skill2Err}</span>
                </FormGroup>
                <h5 className="succCls"> {this.state.messageFromServer}</h5>
                <h5 className="errCls">{this.state.subMandatoryErr}</h5>
                <Button color="success">Submit</Button>
            </Form>
            <Button color="success" onClick={this.addPortifolio1.bind(this)}>Add portifolio</Button>
        </Container>
        );
    }
}
export default EmployeeForm;