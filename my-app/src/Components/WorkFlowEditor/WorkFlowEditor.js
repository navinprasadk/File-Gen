
import React, {Component} from 'react'
import { Header, Segment, Menu, Icon, Sidebar, Container, Form } from 'semantic-ui-react'
// import data from "./../Config/data.js";
import './WorkFlowEditor.css';

export default class WorkFlowEditor extends Component {



// Removes the components from work flow editor
delete = (index, stageNumber) => {
    console.log("inside delete",index);
    this.props.delete(index,stageNumber);
    };
    

 render(){
     console.log("this.props.selectedTools",this.props.selectedTools);
     return(
        <React.Fragment >
        <div className="stage-container">
            <div className="header-content">
                <b className="stage_title">Stage  {this.props.stageNumber+1}</b>
                <Icon className="remove-icon" name="remove circle" />
            </div>
            <Segment basic className='Work_flow_editor_segment_style'>
            <Form className="agent-form" style={{width: "80%", marginTop: "4%"}}>
                    <Form.Field>
                        <span style={{display: "flex", justifyContent: "flex-start"}}>
                        <label style={{paddingTop:'2%', fontSize:'110%', fontWeight:'500', width:'80%'}}> Stage Name</label>
                        <input placeholder='Stage Name'  
                        defaultValue={this.props.stageName}
                        onChange={(e) => {
                            this.props.handlestageNameChange(e, this.props.stageNumber);
                        }} />
                        </span>
                    </Form.Field>
            </Form>
            <div>
                {this.props.selectedTools.length !== 0 ? (
            this.props.selectedTools.map((item,index) => {
                return (
                <Segment className="NonEmpty_work_flow_editor_item_wrapper" onClick={() => {
                    this.props.updateCurrentTool(item);
                }}>
                    <p className='NonEmpty_work_flow_editor_item'>{item.includes("_") ? item.replace("_"," "): item}</p>
                    <Icon name="close" className="NonEmpty_work_flow_editor_icon" onClick={() => {this.delete(index, this.props.stageNumber)}}/>
                </Segment>
                )
            })) : (
                <div className='Empty_work_flow_editor'>
                <center>
                <p className='Empty_work_flow_editor_message'>Drag and drop the components to here</p>
                </center>
                </div>
            )}
            
            </div>
            
            </Segment>
        </div>
      </React.Fragment>
     );
 }
}
