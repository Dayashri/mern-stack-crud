import React from 'react';
import { Container,Button} from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import '../App.css';

class DbInstaller extends React.Component {
    state={
        list:'',
        fName:''
    }
    componentWillMount(){
        // axios.get('/api/reskill/getSkillgroups').then(response =>{
        //     this.setState({
        //         list: response.data
        //     });
        // }).catch(error => {
        //     //console.log(error.response.data.error)
        // });
        axios.get('/api/reskill/getOneSkillGroup',{
            params:{
                name:'Digital'
            }
        }).then(response =>{
            this.setState({
                fName: response.data.name
            });
        }).catch(error => {
            //console.log(error.response.data.error)
        });
        axios.get('/api/reskill/getOneComponentSkill',{
            params:{
                cName:'DevOps',
                grpName:"Digital"
            }
        }).then(response =>{
            this.setState({
                fName: response.data.name
            });
        }).catch(error => {
            //console.log(error.response.data.error)
        });
    }

    addSkillSet1(e){
        e.preventDefault();
        var skillsetStrings=[
            {
                "name":"Digital",
                "Components":[
                    {
                        "name":"User Interface Frameworks",
                        "grpName":"Digital",
                        "skillset":["Angular.js","React.js"]
                    },
                    {
                        "name":"DevOps",
                        "grpName":"Digital",
                        "skillset":["Jenkins","Looper","Concord","Docker","Kubernetes","Ansible","Hygieia","SonarQube","TFS","GIT","OneOps"]
                    },
                    {
                        "name":"Database Frameworks",
                        "grpName":"Digital",
                        "skillset":["Hadoop/Hive","Azure CosmosDB","Cassandra","MongoDB","Maria DB","NoSQL"]
                    },
                    {
                        "name":"Cloud platform",
                        "grpName":"Digital",
                        "skillset":["Microsoft Azure","IBM Blue Mix","Google Cloud"]
                    },
                    {
                        "name":"Integration services",
                        "grpName":"Digital",
                        "skillset":["IBM DP/APIC","SFTP","WS02","IIB","IBM MQ","AMQ","Micro Services","Ehcache"]
                    },
                    {
                        "name":"Mobility",
                        "grpName":"Digital",
                        "skillset":["Cordova","IoS","Android"]
                    },
                    {
                        "name":"Commerce",
                        "grpName":"Digital",
                        "skillset":["ATG","Sterling Commerce"]
                    },
                                
                ]
            },
            {
                "name":"Emerging",
                "Components":[
                    {
                        "name":"Database Frameworks",
                        "grpName":"Emerging",
                        "skillset":["ElasticSearch","Redis","Apache Storm","KAFKA","Apache Camel","Mulesoft"]
                    },
                    {
                        "name":"Process Automation / Optimization",
                        "grpName":"Emerging",
                        "skillset":["UIPath","Workfusion","IBM BPM","IBM ODM","Pega","Blue Prism", "Activiti"]
                    },
                    {
                        "name":"Search",
                        "grpName":"Emerging",
                        "skillset":["ElasticSearch","SOLR","ELK","Splunk","RIPFIRE"]
                    },
                    {
                        "name":"Analytics Language",
                        "grpName":"Emerging",
                        "skillset":["Spark","R","Altryx","SAS","JMP","CPLEX","SPSS","ESRI"]
                    },
                    {
                        "name":"AI, ML, IOT, Blockchain, Cognitive",
                        "grpName":"Emerging",
                        "skillset":["Spark","R","Altryx","SAS","JMP","CPLEX","SPSS","ESRI"]
                    },
                    {
                        "name":"UX & Rapid Prototype",
                        "grpName":"Emerging",
                        "skillset":["Invision"]
                    },
                ]
            },
            {
                "name":"Specialty - Tier 1",
                "Components":[
                    {
                        "name":"Package",
                        "grpName":"Specialty - Tier 1",
                        "skillset":["Service Now","PeopleSoft"]
                    }
                ]
            },
            {
                "name":"Specialty - Tier 2",
                "Components":[
                    {
                        "name":"Package",
                        "grpName":"Specialty - Tier 2",
                        "skillset":["SAP","HANA","JDA","Sales Force","Work brain"]
                    }
                ]
            },
            {
                "name":"Specialty - Tier 3",
                "Components":[
                    {
                        "name":"Package",
                        "grpName":"Specialty - Tier 3",
                        "skillset":["Workday","Success factor"]
                    }
                ]
            }
        ];
            skillsetStrings.forEach(function(querystring){
                axios.post('/api/reskill/addSkillSet',querystring).then(response =>{
                    this.setState({
                        messageFromServer: response.data
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
            });
        

    }

    addPortifolio1(e){
        e.preventDefault();
        var protifolioStrings=[{
            "name":"People Solutions",
            "DM":["Sudip Ghose"],
            "LOB":["Hari","Balaji G"]
            },
{
            "name":"People Modernization",
            "DM":["Sudip Ghose"],
            "LOB":["Balaji R","Arun"]
            },
{
            "name":"GBS",
            "DM":["Sudip Ghose"],
            "LOB":["Balaji R","Arun"]
            },
{
            "name":"LATAM",
            "DM":["Sudip Ghose"],
            "LOB":["Ramu","Alejandra"]
            },
{
            "name":"Support",
            "DM":["Swarup Dutta"],
            "LOB":["Vamsi","Murali"]
            },
{
            "name":"Stores",
            "DM":["Swarup Dutta"],
            "LOB":["Kiran","Surya"]
            },
{
            "name":"Tech Mod",
            "DM":["Swarup Dutta"],
            "LOB":["Ravi P","Saravanand"]
            },
{
            "name":"GDAP",
            "DM":["Swarup Dutta"],
            "LOB":["Venu","Saravanand"]
            },
{
            "name":"Infra",
            "DM":["Swarup Dutta"],
            "LOB":["Chris","Sharmila"]
            },
{
            "name":"Merc",
            "DM":["Santhosh Gopal"],
            "LOB":["Ramesh","Deepti"]
            },
{
            "name":"RM",
            "DM":["Santhosh Gopal"],
            "LOB":["Manoj"]
            },
{
            "name":"IPS",
            "DM":["Sudip Ghose"],
            "LOB":["Saroja"]
            }];
            protifolioStrings.forEach(function(querystring){
                axios.post('/api/reskill/addPortifolio',querystring).then(response =>{
                    this.setState({
                        messageFromServer: response.data
                    });
                }).catch(error => {
                    //console.log(error.response.data.error)
                });
            });
        

    }

    render() {
        
        return (
        <Container>
             <span>{this.state.fName}</span>
            <br/><br/><br/><br/><br/><br/>
            <Button color="success" onClick={this.addPortifolio1.bind(this)}>Add portifolio</Button>
            <br/><br/>
            <Button color="success" onClick={this.addSkillSet1.bind(this)}>Add SkillSets</Button>
        </Container>
        );
    }
}
export default DbInstaller;
