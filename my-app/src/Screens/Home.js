import React, {Component} from 'react';
import { Grid, Accordion, Icon, Segment, Button } from 'semantic-ui-react'
import MenuBarTop from '../Components/MenuBar/MenuBarTop';
import SideBar from '../Components/SideBar/SideBar';
import data from "./../Config/data.js";
import properties from "./../Config/properties.json";
import WorkFlowEditor from "./../Components/WorkFlowEditor/WorkFlowEditor";
import Editor from "./../Components/Editor/Editor";
import BlurredModal from './../Components/Modal/BlurredModal';
import Axios from 'axios';
export default class Home extends Component {

    state = { selectedTools: [], dataSource : [], currentTool: "", stageCount: 1, stages: [{stageName:"",steps:[]}], entireJSON: {}, activeStageNumber : 0, stageName: "" }

    componentDidMount = () => {
        this.setState({
            dataSource: data
        })
        this.readData();
    }

    readData = () => {
        let context = this;
        Axios.get("/fileRead").then(res => {
            context.setState({
                entireJSON: res.data,
                stages : res.data.pipeline.stages != undefined ? res.data.pipeline.stages : [],
                stageCount: res.data.pipeline.stages != undefined ? res.data.pipeline.stages.length : 1
            })
            
            }).catch(err => {
            console.log("err",err);
            })
    }

    updateCurrentTool = (toolName) => {
        this.setState({
            currentTool : toolName
        })
    }

    onDragOver = e => {
        // this.setState({
        //     selectedTools: []
        // })
        e.preventDefault();
      };
     
    onDrop = (e, status, stageNumber) => {
        this.setState({
            activeStageNumber: stageNumber
        })
        let key = e.dataTransfer.getData("key");
        let optionIndex = e.dataTransfer.getData("optionIndex");
        let copy = [] ;
        if( this.state.stages[stageNumber] != undefined && Object.keys(this.state.stages[stageNumber]) != undefined && this.state.stages[stageNumber]["steps"].length){
            copy = [...this.state.selectedTools];
        } else {
            copy = [];
        }
        let currentTool = this.state.currentTool;
        let stages = this.state.stages;



        if (copy.length === 0) {
            copy.push(this.state.dataSource[key].options[optionIndex]);
            currentTool = this.state.dataSource[key].options[optionIndex];
        } 
        else {
        if(copy.indexOf(this.state.dataSource[key].options[optionIndex]) === -1) {
         copy.push(this.state.dataSource[key].options[optionIndex])
        currentTool = this.state.dataSource[key].options[optionIndex]
        }
        else {alert("Component Already Exists"); }
        }

        copy.map(tool => {
            let tools = tool.toLowerCase().replace(" ", "_");
            if(stages[stageNumber] == undefined){
                stages.push({stageName:"",steps:[]});
            }
            stages[stageNumber]["steps"][tools] = properties[tools];
        })

        this.setState(
        { selectedTools: copy, currentTool, stages }, () => {
            console.log("stagessssss",JSON.stringify(this.state.stages));
        }
        );
      };

      handlestageNameChange = (e, number) => {
           this.setState({
               stageName: e.target.value
           }, () => {
                let {stages} = this.state;
                stages[number]["stageName"] = this.state.stageName; 
                this.setState({
                    stages: stages
                }, () => {
                    // this.updateData();
                })
           }) 
        }

    createStages = () => {
        let stageToBeDisplayed = [];
        let { stageCount, stages, activeStageNumber, selectedTools} = this.state;

        console.log("stagesss",JSON.stringify(stages));
   
        for(let i = 0; i< stageCount; i++){
            console.log("jhjkjkjkk", activeStageNumber == 0 || stages.length  , (stages[i] != undefined && Object.keys(stages[i]["steps"]).length) , Object.keys(stages[i]["steps"]) , selectedTools ,  selectedTools)
            stageToBeDisplayed.push(
                <div onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "dropped", i)} key={i}>
                    <WorkFlowEditor selectedTools= { activeStageNumber == 0 || stages.length  ? (stages[i]["steps"] != undefined && Object.keys(stages[i]["steps"]).length) ? Object.keys(stages[i]["steps"]) : activeStageNumber === i ? selectedTools : [] : []} delete={this.delete} updateCurrentTool={this.updateCurrentTool} stageNumber={i} currentTool={this.state.currentTool} stageName={stages.length ? stages[i]["stageName"] != undefined ? stages[i]["stageName"] : "" : ""} handlestageNameChange={this.handlestageNameChange}/>
                </div>
            )
        }
        return stageToBeDisplayed;
    }

    delete = (index, stageNumber) => {
        let copy = [...this.state.selectedTools];

        copy.splice(index, 1);
        let {stages} = this.state;
        console.log("JSO",stages);
        stages[stageNumber]["steps"].splice(index,1);
        console.log("JSO22222",stages);
        this.setState(
          {
            selectedTools: copy,
            stages
          }, () => {
            this.updateData();
            this.createStages();
          }
        );
      };

      updateData = () => {
        let data = this.state.entireJSON;
        console.log("updateData stages",this.state.stages);
        data.pipeline["stages"] = this.state.stages;
        console.log("sta",data);
        this.generateData();
        let context =  this;

        Axios.post("/fileWrite",data).then(res => {
            console.log("res",res);
            context.readData();
            }).catch(err => {
            console.log("err",err);
            })
    }

    generateData = () => {
        let data = this.state.entireJSON;
        console.log("updateData stages",this.state.stages);
        data.pipeline["stages"] = this.state.stages;
        console.log("sta",data);
        let context =  this;
        
        Axios.post("/api/fileOperations/generate",data).then(res => {
            console.log("res",res);
            context.readData();
            }).catch(err => {
            console.log("err",err);
            })
    }


    handleChangeValue = (e, currentTool, key) => {
         let {stages, activeStageNumber} = this.state;


         console.log("sdfdffd",stages);
         console.log("activeStageNumber",activeStageNumber);
         console.log("key",key);

         let currentProp = stages[activeStageNumber]["steps"] != undefined ? stages[activeStageNumber]["steps"] : [];
         currentProp[currentTool] = currentProp[currentTool] !=  undefined ? Object.keys(currentProp[currentTool]).length ? currentProp[currentTool] : properties[currentTool] : properties[currentTool];
         currentProp[currentTool][key] = e.target.value;

         this.setState({
            stages
         }, () => {
             console.log("sdfdffd",this.state.stages);
         })
    }
    

    render(){
        console.log("stages",JSON.stringify(this.state.stages));
        return(
            <React.Fragment>
                 <MenuBarTop/>
                 <Grid >
                 <Grid.Row >
                    {/* <BlurredModal/> */}
                    <Grid.Column width={4} style={{ height:'100vh', overflow: 'hidden', backgroundColor:'#fff'}}>
                        <SideBar/>
                    </Grid.Column>

                    <Grid.Column width={7} style={{backgroundColor:'#f4f5f7', minHeight: '100vh'}}>
                    <b className="Work_flow_editor_title">Work Flow </b>
                    {this.createStages()}
                    {this.state.stages.length  ? Object.keys(this.state.stages[this.state.stages.length-1]["steps"]).length ?
                    <div>
                    <Icon name="add circle" size="big" style={{float:"right", marginTop: "5%"}} 
                     onClick={() => {
                            this.setState({
                                stageCount: this.state.stageCount+1,
                                selectedTools: [],
                                stages: [...this.state.stages,{stageName:"",steps:[]}]
                            })
                        }}/>
                        <Button size='tiny' color='black' className='Editor_save_button' onClick={this.updateData}>Generate</Button>
                    </div>
                         : null : null
                        
                    }
                    </Grid.Column>

                    <Grid.Column width={5}>
                        <Editor currentTool={this.state.currentTool} selectedTools={this.state.selectedTools} activeStageNumber={this.state.activeStageNumber} handleChangeValue={this.handleChangeValue}/>
                    </Grid.Column>

                 </Grid.Row>
                 </Grid>
            </React.Fragment>
        )
    }
}

