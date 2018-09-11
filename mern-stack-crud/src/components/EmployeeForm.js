import React from 'react';
import { Container,Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import '../App.css';

class EmployeeForm extends React.Component {
    state = {
        selectedOptionp:'',
        selectedOption1: '',
        selectedOption2: '',
        messageFromServer:'',
        portifolioOptions:[],
        DMOptions:[],
        LObLeadOptions:[],
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
    handlePortiFolioChange=(selectedOption)=>{
        if(!selectedOption.value==""){
            axios.get('/api/reskill/getOnlyPortifolio',{
                params:{
                    name:selectedOption.value
                }
            }).then(response =>{
                var DMOptions=[];
                var dmOptions=[];
                var lobOptions=[];
                var rep=response.data;debugger
                rep.forEach(function(data){
                    dmOptions=data.DM;
                    lobOptions=data.LOB;
                });
                dmOptions.forEach(function(data){
                    DMOptions:[{label:data,value:data}]
                })
                    this.setState({
                        DMOptions:DMOptions,selectedOptionp:selectedOption,
                        LObLeadOptions:[{label:"Please select Your DM",value:""}]
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }
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
    
    componentWillMount(){debugger
        axios.get('/api/reskill/getAllPortifolio').then(response =>{
            var portifolioOptions=[];
            var rep=response.data;
            rep.forEach(function(data){
                portifolioOptions.push({label:data.name,value:data.name});
            });
                this.setState({
                    portifolioOptions: portifolioOptions,
                    
                    DMOptions:[{label:"Please select Your Portifolio",value:""}],
                    LObLeadOptions:[{label:"Please select Your Portifolio",value:""}]
                });
            }).catch(error => {
                //console.log(error.response.data.error)
            });
    }

    render() {
        const selectedOptionp  = this.state.selectedOptionp;
        const selectedOption1  = this.state.selectedOption1;
        const selectedOption2  = this.state.selectedOption2;
        const value1 = selectedOption1 && selectedOption1.value;
        const value2 = selectedOption2 && selectedOption2.value;
        const valuep = selectedOptionp && selectedOptionp.value;
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
                    <Label for="empId">Emp ID </Label>
                    <Input type="text" name="empId" id="empId" ref="empId" onChange={this.onChangeEmpId.bind(this)}/>
                    <span className="errCls">{this.state.fNameErr}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="empEml">Email ID</Label>
                    <Input type="text" name="empEml" id="empEml" ref="empEml" onChange={this.onChangeEmpId.bind(this)}/>
                    <span className="errCls">{this.state.lNameErr}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="portifolio">Portifolio</Label>
                    <Select ref="portifolio"
                        value={value1}
                        options={this.state.portifolioOptions}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handlePortiFolioChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dm">DM</Label>
                    <Select ref="dm"
                        value={value1}
                        options={this.state.DMOptions}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleChange1}
                    />
                    <span className="errCls">{this.state.skill1Err}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="lob">LOB</Label>
                    <Select ref="lob"
                        value={value2}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleChange2}
                        options={this.state.LObLeadOptions}
                    />
                    <span className="errCls">{this.state.skill2Err}</span>
                </FormGroup>
                <h5 className="succCls"> {this.state.messageFromServer}</h5>
                <h5 className="errCls">{this.state.subMandatoryErr}</h5>
                <Button color="success">Submit</Button>
            </Form>
        </Container>
        );
    }
}
export default EmployeeForm;
