import React from 'react';
import { Container,Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import '../App.css';

class EmployeeForm extends React.Component {
    state = {
        selectedOptionP:'',
        selectedOptionD: '',
        selectedOptionL: '',
        selectedOptionG:'',
        selectedOptionC: '',
        selectedOptionS: '',
        messageFromServer:'',
        portifolioOptions:[],
        DMOptions:[],
        LObLeadOptions:[],
        grpOptions:[],
        compGrpOptions:[],
        skillGrpOptions:[],
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
                var rep=response.data;
                rep.forEach(function(data){
                    dmOptions=data.DM;
                    lobOptions=data.LOB;
                });
                dmOptions.forEach(function(data){
                    DMOptions=[{label:data,value:data}]
                })
                    this.setState({
                        DMOptions:DMOptions,selectedOptionP:selectedOption,
                        selectedOptionD:"",selectedOptionL:"",
                        LObLeadOptions:[{label:"Please select Your DM",value:""}]
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }
    }
    handleDMChange = (selectedOption) => {
        if(!selectedOption.value==""){
            axios.get('/api/reskill/getOnlyPortifolio',{
                params:{
                    name:this.state.selectedOptionP.value
                }
            }).then(response =>{
                var DMOptions=[];
                var LOBOptions=[];
                var dmOptions=[];
                var lobOptions=[];
                var rep=response.data;
                rep.forEach(function(data){
                    dmOptions=data.DM;
                    lobOptions=data.LOB;
                });
                lobOptions.forEach(function(data){
                    LOBOptions.push({label:data,value:data})
                })
                    this.setState({
                        selectedOptionD:selectedOption,
                        LObLeadOptions:LOBOptions
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }
    }

    handleLobChange = (selectedOption) => {
        this.setState({ selectedOptionL:selectedOption});
    }

    handleGrpChange=(selectedOption) =>{
        if(!selectedOption.value==""){
            axios.get('/api/reskill/getOneSkillGroup',{
                params:{
                    name:selectedOption.value
                }
            }).then(response =>{
                var compGrpOptions=[];
                var comOptions=[];
                var rep=response.data[0].Components;
                rep.forEach(function(data){
                    comOptions.push(data.name);
                });
                comOptions.forEach(function(data){
                    compGrpOptions.push({label:data,value:data})
                })
                    this.setState({
                        compGrpOptions:compGrpOptions,
                        selectedOptionG:selectedOption,
                        selectedOptionC:'',selectedOptionS:'',
                        skillGrpOptions:[{label:"Please select Your Component",value:""}]
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }
    }

    handleCompChange = (selectedOption) => {
        if(!selectedOption.value==""){
            axios.get('/api/reskill/getOneComponentSkill',{
                params:{
                    cName:selectedOption.value,
                    grpName:this.state.selectedOptionG.value
                }
            }).then(response =>{
                var skillGrpOptions=[];
                var skillOptions=[];
                var rep=response.data[0].Components;
                var selComponent=rep.filter(resp => resp.name===selectedOption.value);
                skillOptions=selComponent[0].skillset;
                skillOptions.forEach(function(data){
                    skillGrpOptions.push({label:data,value:data})
                })
                    this.setState({
                        selectedOptionC:selectedOption,
                        skillGrpOptions:skillGrpOptions
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }
    }

    handleSkillChange = (selectedOption) => {
        this.setState({ selectedOptionS:selectedOption});
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
    
    componentWillMount(){
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
        axios.get('/api/reskill/getSkillgroups').then(response =>{
                var grpOptions=[];
                var rep=response.data;
                rep.forEach(function(data){
                    grpOptions.push({label:data.name,value:data.name});
                });
                this.setState({
                    grpOptions: grpOptions,
                    compGrpOptions:[{label:"Please select Your Group",value:""}],
                    skillGrpOptions:[{label:"Please select Your Group",value:""}]
                });
            }).catch(error => {
                    //console.log(error.response.data.error)
            });
    }

    render() {
        const selectedOptionP  = this.state.selectedOptionP;
        const selectedOptionD  = this.state.selectedOptionD;
        const selectedOptionL  = this.state.selectedOptionL;
        const selectedOptionG=this.state.selectedOptionG;
        const selectedOptionC=this.state.selectedOptionC;
        const selectedOptionS=this.state.selectedOptionS;
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
                    <Input type="text" name="empEml" id="empEml" ref="empEml" placeholder="without @infosys.com" onChange={this.onChangeEmpId.bind(this)}/>
                    <span className="errCls">{this.state.lNameErr}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="portifolio">Portifolio</Label>
                    <Select ref="portifolio"
                        value={selectedOptionP}
                        options={this.state.portifolioOptions}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handlePortiFolioChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dm">DM</Label>
                    <Select ref="dm"
                        value={selectedOptionD}
                        options={this.state.DMOptions}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleDMChange}
                    />
                    <span className="errCls">{this.state.skill1Err}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="lob">LOB</Label>
                    <Select ref="lob"
                        value={selectedOptionL}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleLobChange}
                        options={this.state.LObLeadOptions}
                    />
                    <span className="errCls">{this.state.skill2Err}</span>
                </FormGroup>

                <FormGroup>
                    <Label for="grp">Group</Label>
                    <Select ref="grp"
                        value={selectedOptionG}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleGrpChange}
                        options={this.state.grpOptions}
                    />
                    <span className="errCls">{this.state.skill2Err}</span>
                </FormGroup>

                <FormGroup>
                    <Label for="comp">Components</Label>
                    <Select ref="comp"
                        value={selectedOptionC}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleCompChange}
                        options={this.state.compGrpOptions}
                    />
                    <span className="errCls">{this.state.skill2Err}</span>
                </FormGroup>

                <FormGroup>
                    <Label for="lob">Product/Technology/Skill set</Label>
                    <Select ref="lob"
                        value={selectedOptionS}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={this.handleSkillChange}
                        options={this.state.skillGrpOptions}
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
