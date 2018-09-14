import React from 'react';
import PropTypes from 'prop-types';
import { Container,Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { RadioGroup, Radio} from 'react-radio-group';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import 'rc-checkbox/assets/index.css';
import Select from 'react-select';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import skills from '../SkillDetails.png';
import lobs from '../LobDetails.png';

class EmployeeForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
            certifiedFlag:'',
            certificationType:[],
            certBfTimeFlag:'',
            certificationDt:null,
            disableCertBfTimeFlag:true,
            disableCertBfTimeDt:true,
            disableCertFlag:true,
            disableCertTimeFlag:true,
            disableCalendar:true,
            startDate: null,
            empEmail:'',
            emailErr:'',
            empId:'',
            empErr:'',
            empAcc:'',
            accErr:'',
            portifolioErr:'',
            dmErr:'',
            lobErr:"",
            groupErr:'',
            compErr:'',
            skillErr:"",
            certifiedErr:"",
            certTypeErr:"",
            certifyBfDtErr:"",
            certifyBfErr:"",
            subMandatoryErr:''
        }
    }
    

    handleDtChange(date) {
        this.setState({
            messageFromServer:"",
            startDate: date,
            subMandatoryErr:""
        });
      }
    

    handleCertifiedChg(value) {
        var certificationType=this.state.certificationType;
        var certifiedErr="";
        var disableCertFlag=false;
        var certBfTimeFlag=''
        var disableCertTimeFlag=false;
        if(value==="Yes"){
            disableCertFlag=false;
            certBfTimeFlag=''
            disableCertTimeFlag=true;
            certifiedErr="";
        }else if(value="No"){
            disableCertFlag=true;
            certificationType=[];
            certBfTimeFlag='';
            disableCertTimeFlag=false;
            certifiedErr="";
        }else{
            certifiedErr="This field is Mandatory"
        }
        this.setState({
            certifiedFlag: value,
            messageFromServer:"",
            certTypeErr:"",
            certifiedErr:certifiedErr,
            certifyBfErr:"",
            certifyBfDtErr:"",
            certBfTimeFlag:certBfTimeFlag,
            disableCalendar:true,
            disableCertFlag:disableCertFlag,
            certificationType:certificationType,
            disableCertTimeFlag:disableCertTimeFlag,subMandatoryErr:""
        });
    }

    handleCertBfTimeFlagChg(value) {
        var disableCalendar=false;
        if(value=='Yes'){
            disableCalendar=true;
        }else{
            disableCalendar=false;
        }
        this.setState({
            certBfTimeFlag: value,
            certifyBfErr:"",
            certifyBfDtErr:"",
            messageFromServer:"",
            startDate:null,
            disableCalendar:disableCalendar,subMandatoryErr:""
        });
    }


    handleCertTypeChg = (certificationType) => {
        var certTypeErr="";
        if(certificationType.length==0){
            certTypeErr="This field is Mandatory";
        }else{
            certTypeErr=""
        }
        this.setState({
            messageFromServer:"",
            certificationType: certificationType,
            certTypeErr:certTypeErr,subMandatoryErr:""
        });
    }

    handlePortiFolioChange=(selectedOption)=>{
        var portifolioErr="";
        if(!selectedOption.value=="" && selectedOption.value!=="--"){
            portifolioErr="";
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
                        portifolioErr:portifolioErr,
                        messageFromServer:"",
                        DMOptions:DMOptions,selectedOptionP:selectedOption,
                        selectedOptionD:"",selectedOptionL:"",
                        LObLeadOptions:[{label:"Please select Your DM",value:"--"}]
                        ,subMandatoryErr:""
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }else if(selectedOption.value==="--"){
            portifolioErr="This field is Mandatory";
            this.setState({
                messageFromServer:"",
                portifolioErr:portifolioErr,
                selectedOptionP:'',subMandatoryErr:""
            });
        }
        else{
            portifolioErr="This field is Mandatory";
            this.setState({
                messageFromServer:"",
                portifolioErr:portifolioErr,subMandatoryErr:""
            });
        }
    }
    handleDMChange = (selectedOption) => {
        var dmErr="";
        if(!selectedOption.value=="" && selectedOption.value!=="--"){
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
                        dmErr:dmErr,
                        messageFromServer:"",
                        selectedOptionD:selectedOption,
                        LObLeadOptions:LOBOptions,subMandatoryErr:""
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }else if(selectedOption.value==="--"){
            dmErr="This field is Mandatory";
            selectedOption='';
            this.setState({
                messageFromServer:"",
                dmErr:dmErr,
                selectedOptionD:selectedOption,subMandatoryErr:""
            });
        }
        else{
            dmErr="This field is Mandatory";
            this.setState({
                messageFromServer:"",
                dmErr:dmErr,subMandatoryErr:""
            });
        }
    }

    handleLobChange = (selectedOption) => {
        var lobErr="";
        if(selectedOption.value===""){
            lobErr="This field is Mandatory";
        }else if(selectedOption.value==="--"){
            lobErr="This field is Mandatory";
            selectedOption='';
        }
        else{
            lobErr="";
        }
        this.setState({lobErr:lobErr, messageFromServer:"",selectedOptionL:selectedOption,subMandatoryErr:""});
    }

    handleGrpChange=(selectedOption) =>{
        if(!selectedOption.value=="" && selectedOption.value!=="--"){
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
                        groupErr:"",
                        messageFromServer:"",
                        compGrpOptions:compGrpOptions,
                        selectedOptionG:selectedOption,
                        selectedOptionC:'',selectedOptionS:'',
                        skillGrpOptions:[{label:"Please select Your Component",value:"--"}]
                        ,subMandatoryErr:""
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }else if(selectedOption.value==="--"){
            this.setState({
                messageFromServer:"",
                groupErr:"This field is Mandatory",
                selectedOptionG:'',subMandatoryErr:""
            })
        }
        else{
            this.setState({
                messageFromServer:"",
                groupErr:"This field is Mandatory",subMandatoryErr:""
            })
        }
    }

    handleCompChange = (selectedOption) => {
        if(!selectedOption.value=="" && selectedOption.value!=="--"){
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
                        compErr:"",
                        messageFromServer:"",
                        selectedOptionC:selectedOption,
                        skillGrpOptions:skillGrpOptions,subMandatoryErr:""
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
        }else if(selectedOption.value==="--"){
            this.setState({
                messageFromServer:"",
                compErr:"This field is Mandatory",
                selectedOptionC:'',subMandatoryErr:""
            });
        }
        else{
            this.setState({
                messageFromServer:"",
                compErr:"This field is Mandatory",subMandatoryErr:""
            });
        }
    }

    handleSkillChange = (selectedOption) => {
        var skillErr="";
        if(selectedOption.value!=="" && selectedOption.value!=="--"){
            skillErr="";
        }else if(selectedOption.value==="--"){
            selectedOption='';
            skillErr="This field is Mandatory";
        }else{
            skillErr="This field is Mandatory";
        }
        this.setState({ skillErr:skillErr,selectedOptionS:selectedOption,messageFromServer:"",subMandatoryErr:""});
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
            messageFromServer:"",
            subMandatoryErr:subMandatoryErr
        })
    }
    onChangeEmpEmail(e){
        e.preventDefault();
        var emailErr=this.state.emailErr;
        var subMandatoryErr="";
        var inputVal=e.target.value;
        if(inputVal===""){
            emailErr='This is a mandatory field';
        }else{
            emailErr='';
        }
        this.setState({
            emailErr:emailErr,
            empEmail:inputVal,
            messageFromServer:"",
            subMandatoryErr:subMandatoryErr
        })
    }

    onChangeEmpAcc(e){
        e.preventDefault();
        var accErr=this.state.accErr;
        var subMandatoryErr="";
        var inputVal=e.target.value;
        if(inputVal===""){
            accErr='This is a mandatory field';
        }else{
            accErr='';
        }
        this.setState({
            accErr:accErr,
            empAcc:inputVal,
            messageFromServer:"",
            subMandatoryErr:subMandatoryErr
        })
    }

    handleSubmit(e){
        e.preventDefault();
        var subMandatoryErr="";
        var emailFlag=this.state.emailErr.length===0 && this.state.empEmail!=="";
        var empIdFlag=this.state.empErr.length===0 && this.state.empId!=="";
        var accFlag=this.state.empAcc!==""&&this.state.accErr.length===0;
        var portifolioFlag=this.state.portifolioErr.length===0 && this.state.selectedOptionP.value!=="";
        var dmFlag=this.state.dmErr.length===0 && this.state.selectedOptionD.value!=="" 
                    && this.state.selectedOptionD.label!=="Please select Your Portfolio";
        var lobFlag=this.state.lobErr.length===0 && this.state.selectedOptionL.value!==""
            && this.state.selectedOptionL.label!=="Please select Your Portfolio" 
            && this.state.selectedOptionL.label!=="Please select Your DM";
        var groupFlag=this.state.groupErr.length===0 && this.state.selectedOptionG.value!=="";
        var compFlag=this.state.compErr.length===0 && this.state.selectedOptionC.value!==""
                && this.state.selectedOptionC.label!=="Please select Your Group";
        var skillsFlag=this.state.skillErr.length===0 && this.state.selectedOptionS.value!==""
                && this.state.selectedOptionS.label!=="Please select Your Group"
                && this.state.selectedOptionS.label!=="Please select Your Component";
        var certifiedFlag=this.state.certifiedErr.length===0 && this.state.certifiedFlag!=="";
        var certifiedErr=this.state.certifiedErr;
        var certTypeErr="";
        var certifyBfErr="";
        var certifyBfDtErr="";
        if(emailFlag&&empIdFlag&&portifolioFlag&&dmFlag&&lobFlag && groupFlag &&
            compFlag&& skillsFlag&& certifiedFlag&&accFlag){
                if(this.state.certifiedFlag==="Yes"){
                    if(this.state.certificationType.length==0){
                        certTypeErr="This field is Mandatory";
                    }else{
                        certTypeErr=""
                    }
                }else if(this.state.certifiedFlag==="No"){
                    if(this.state.certBfTimeFlag==""){
                        certifyBfErr="This field is Mandatory";
                    }else{
                        certifyBfErr="";
                        if(this.state.certBfTimeFlag=="Yes"){
                            certifyBfDtErr="";
                        }else{
                            if(this.state.startDate===null || this.state.startDate===undefined || this.state.startDate===""){
                                certifyBfDtErr="This field is mandatory"
                            }else{
                                certifyBfDtErr="";
                            }
                        }
                    }
                }else{
                    subMandatoryErr="Please Fill all mandatory fields";
                }
                if(certifyBfDtErr===""&& certifyBfErr===""&& certTypeErr===""&& certifiedErr===""){
                    subMandatoryErr="";
                    var querystring={
                        employeeEmail: this.state.empEmail,
                        employeeId: this.state.empId,
                        Account:this.state.empAcc,
                        Portifolio:this.state.selectedOptionP.value,
                        DM: this.state.selectedOptionD.value,
                        LOB: this.state.selectedOptionL.value,
                        Group: this.state.selectedOptionG.value,
                        Component: this.state.selectedOptionC.value,
                        SkillChosen: this.state.selectedOptionS.value,
                        Certified:this.state.certifiedFlag,
                        certificationType:this.state.certificationType,
                        certifyBfTime:this.state.certBfTimeFlag,
                        certificationDate:this.state.startDate,
                    }
                    axios.post('/api/reskill/addSkill',querystring).then(response =>{
                        this.setState({
                            messageFromServer: response.data,
                            selectedOptionP:'',
                            selectedOptionD: '',
                            selectedOptionL: '',
                            selectedOptionG:'',
                            selectedOptionC: '',
                            selectedOptionS: '',
                            certifiedFlag:'',
                            certificationType:[],
                            certBfTimeFlag:'',
                            certificationDt:null,
                            disableCertBfTimeFlag:true,
                            disableCertBfTimeDt:true,
                            disableCertFlag:true,
                            disableCertTimeFlag:true,
                            disableCalendar:true,
                            startDate: null,
                            empEmail:'',
                            emailErr:'',
                            empId:'',
                            empErr:'',
                            portifolioErr:'',
                            dmErr:'',
                            lobErr:"",
                            groupErr:'',
                            compErr:'',
                            skillErr:"",
                            certifiedErr:"",
                            certTypeErr:"",
                            certifyBfDtErr:"",
                            certifyBfErr:"",
                            subMandatoryErr:'',
                            DMOptions:[{label:"Please select Your Portfolio",value:"--"}],
                            LObLeadOptions:[{label:"Please select Your Portfolio",value:"--"}],
                            compGrpOptions:[{label:"Please select Your Group",value:"--"}],
                            skillGrpOptions:[{label:"Please select Your Group",value:"--"}]
                        });
                    }).catch(error => {
                        //console.log(error.response.data.error)
                    });
            }
        }else{
            subMandatoryErr="Please Fill all mandatory Fields"
        }
        this.setState({
            subMandatoryErr:subMandatoryErr,
            certifyBfErr:certifyBfErr,
            certifyBfDtErr:certifyBfDtErr,
            certifiedErr:certifiedErr,
            certTypeErr:certTypeErr
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
                    
                    DMOptions:[{label:"Please select Your Portfolio",value:"--"}],
                    LObLeadOptions:[{label:"Please select Your Portfolio",value:"--"}]
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
                    compGrpOptions:[{label:"Please select Your Group",value:"--"}],
                    skillGrpOptions:[{label:"Please select Your Group",value:"--"}]
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
            <div>
                <h5 className="errCls pull-right"> Note:  Multiple Submissions are allowed!</h5>
        <div className="row">
            
            <br/>
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12" style={{"paddingLeft":"3%"}}>
                <div className="container">
                    <Form onSubmit={this.handleSubmit.bind(this)} style={{"fontSize":"11px"}}>
                        <FormGroup>
                            <Label for="empId">Emp ID </Label><span className="errCls">*</span>
                            <Input type="text" name="empId" id="empId" ref="empId" style={{"font-size":"1.25rem"}} value={this.state.empId} onChange={this.onChangeEmpId.bind(this)}/>
                            <span className="errCls">{this.state.empErr}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="empEml">Email ID</Label><span className="errCls">*</span>
                            <Input type="text" name="empEml" id="empEml" ref="empEml" style={{"font-size":"1.25rem"}} value={this.state.empEmail} onChange={this.onChangeEmpEmail.bind(this)}/>
                            <span><i className="glyphicon glyphicon-info-sign"></i>&nbsp; without @infosys.com</span>
                            <span className="errCls">{this.state.emailErr}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="empAcc">Account</Label><span className="errCls">*</span>
                            <Input type="text" name="empAcc" id="empAcc" ref="empAcc" style={{"font-size":"1.25rem"}}  value={this.state.empAcc} onChange={this.onChangeEmpAcc.bind(this)}/>
                            <span className="errCls">{this.state.accErr}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="portifolio">Portfolio</Label><span className="errCls">*</span>
                            <Select ref="portifolio"
                                value={selectedOptionP}
                                options={this.state.portifolioOptions}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                onChange={this.handlePortiFolioChange}
                            />
                            <span className="errCls">{this.state.portifolioErr}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dm">DM</Label><span className="errCls">*</span>
                            <Select ref="dm"
                                value={selectedOptionD}
                                options={this.state.DMOptions}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                onChange={this.handleDMChange}
                            />
                            <span className="errCls">{this.state.dmErr}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lob">LOB</Label><span className="errCls">*</span>
                            <Select ref="lob"
                                value={selectedOptionL}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                onChange={this.handleLobChange}
                                options={this.state.LObLeadOptions}
                            />
                            <span className="errCls">{this.state.lobErr}</span>
                        </FormGroup>

                        <FormGroup>
                            <Label for="grp">Group</Label><span className="errCls">*</span>
                            <Select ref="grp"
                                value={selectedOptionG}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                onChange={this.handleGrpChange}
                                options={this.state.grpOptions}
                            />
                            <span className="errCls">{this.state.groupErr}</span>
                        </FormGroup>

                        <FormGroup>
                            <Label for="comp">Components</Label><span className="errCls">*</span>
                            <Select ref="comp"
                                value={selectedOptionC}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                onChange={this.handleCompChange}
                                options={this.state.compGrpOptions}
                            />
                            <span className="errCls">{this.state.compErr}</span>
                        </FormGroup>

                        <FormGroup>
                            <Label for="lob">Product/Technology/Skill set</Label><span className="errCls">*</span>
                            <Select ref="lob"
                                value={selectedOptionS}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                onChange={this.handleSkillChange}
                                options={this.state.skillGrpOptions}
                            />
                            <span className="errCls">{this.state.skillErr}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="certifiedFlag">Already Certified</Label><span className="errCls">*</span>
                            <RadioGroup
                                name="certifiedFlag"
                                selectedValue={this.state.certifiedFlag}
                                onChange={this.handleCertifiedChg.bind(this)}>
                                <label>
                                    <Radio value="Yes"/>Yes
                                </label>&emsp;&emsp;
                                <label>
                                    <Radio value="No"/>No
                                </label>
                            </RadioGroup>
                            <span className="errCls">{this.state.certifiedErr}</span>
                        </FormGroup>
                        <FormGroup style={{display:(!this.state.disableCertFlag?'block':'none')}}>
                            <Label for="certificationType">If Certifified, Yes</Label>
                            <CheckboxGroup
                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                name="certificationType"
                                value={this.state.certificationType}
                                onChange={this.handleCertTypeChg}>
                                <label><Checkbox value="External" disabled={this.state.disableCertFlag}/> External</label>
                                <label><Checkbox value="Internal" disabled={this.state.disableCertFlag}/> Internal</label>
                            </CheckboxGroup>
                            <span className="errCls">{this.state.certTypeErr}</span>
                        </FormGroup>
                        <FormGroup style={{display:(!this.state.disableCertTimeFlag?'block':'none')}}>
                            <Label for="certBfTimeFlag">If no, Will you Certify Before Nov 2018</Label>
                            <RadioGroup onChange={this.handleCertBfTimeFlagChg.bind(this)}
                                name="certBfTimeFlag" selectedValue={this.state.certBfTimeFlag}
                                >
                                <label>
                                    <Radio value="Yes"/>Yes
                                </label>&emsp;&emsp;
                                <label>
                                    <Radio value="No"/>No
                                </label>
                            </RadioGroup>
                            <span className="errCls">{this.state.certifyBfErr}</span>
                        </FormGroup>
                        <FormGroup style={{display:(!this.state.disableCalendar?'block':'none')}}>
                            <Label for="certBfTimeFlag">If no, enter the Time Period</Label>
                            <DatePicker customInput={<ExampleCustomInput />}
                                minDate={moment()}
                                openToDate={moment()}
                                readOnly={this.state.disableCalendar}
                                selected={this.state.startDate}
                                onChange={this.handleDtChange.bind(this)}
                            />
                            <span className="errCls"><i className="glyphicon glyphicon-info-sign"></i>&emsp;Note: This will be added as a goal in iCount</span>
                        </FormGroup>
                        <span className="errCls">{this.state.certifyBfDtErr}</span>
                        <h5 className="succCls"> {this.state.messageFromServer}</h5>
                        <h5 className="errCls">{this.state.subMandatoryErr}</h5>
                        <Button color="success dtCls">Submit</Button>
                    </Form>
                </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">

                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <b><h5 className="imgDet">LOB Details</h5></b>
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <img className="imgDuisp1" src={lobs} alt="LOBs"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <br/><b><h5 className="imgDet">Skillsets</h5></b>
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <img className="imgDuisp2" src={skills} alt="SKILLS"/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}
class ExampleCustomInput extends React.Component {

    render () {
      return (
        <span
          className="label label-primary dtCls"
          onClick={this.props.onClick}><i className="glyphicon glyphicon-calendar"></i>
          {this.props.value}
        </span>
      )
    }
  }

ExampleCustomInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
  }

export default EmployeeForm;
